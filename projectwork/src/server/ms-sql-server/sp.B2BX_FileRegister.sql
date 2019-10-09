/****** Object:  StoredProcedure [dbo].[B2BX_FileRegister]    Script Date: 09/10/19 21:19:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mikhail V. Kiselev
-- Create date: 09.10.2019
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[B2BX_FileRegister] 
	@XML		AS XML,
	@FileID		AS INT OUTPUT
AS
BEGIN

	SET NOCOUNT ON;

	BEGIN TRY

		SET @FileID = 0

		DECLARE @OrderDetails TABLE (
			RowNumber	INT NULL,
			PartID		NVARCHAR(255) NULL,
			Quantity	INT NULL,
			ErrorStatus	BIT NOT NULL DEFAULT 0,
			ErrorText	NVARCHAR(MAX),
			ArticleID	INT NULL
		);

		DECLARE @OrderID AS INT = (@XML.value('(/order/header[1]/orderid)[1]', 'INT'))
		DECLARE @UserID AS INT = (@XML.value('(/order/header[1]/userid)[1]', 'INT'))
		DECLARE @FileName AS NVARCHAR(255) = (@XML.value('(/order/header[1]/filename)[1]', 'NVARCHAR(255)'))
		DECLARE @SheetName AS NVARCHAR(255) = (@XML.value('(/order/header[1]/sheetname)[1]', 'NVARCHAR(255)'))
		DECLARE @FirstRow AS INT = (@XML.value('(/order/header[1]/firstrow)[1]', 'INT'))
		DECLARE @LastRow AS INT = (@XML.value('(/order/header[1]/lastrow)[1]', 'INT'))
		DECLARE @ArticleColumn AS INT = (@XML.value('(/order/header[1]/articlecolumn)[1]', 'INT'))
		DECLARE @QuantityColumn AS INT = (@XML.value('(/order/header[1]/quantitycolumn)[1]', 'INT'))

		INSERT INTO @OrderDetails (RowNumber, PartID, Quantity)
		SELECT
			 Line.value('./rownumber[1]', 'INT') AS RowNumber
			,Line.value('./partid[1]', 'NVARCHAR(255)') AS PartID
			,Line.value('./quantity[1]', 'INT') AS Quantity
		FROM
			@XML.nodes('/order/details/row') AS Details(Line)

		UPDATE @OrderDetails
		SET
			ArticleID = MaterialID, ErrorStatus = CASE WHEN MaterialID IS NULL THEN 1 ELSE 0 END, ErrorText = CASE WHEN MaterialID IS NULL THEN N'Описание товара не найдено' ELSE NULL END
		FROM
			@OrderDetails AS OD
			CROSS APPLY (SELECT MaterialID FROM dbo.HardPriceTbl AS H WITH(NOLOCK) WHERE PartID = OD.PartID OR ManufactPartID = OD.PartID) AS T0
		 WHERE
			ErrorStatus = 0

		UPDATE @OrderDetails
		SET
			ErrorStatus = CASE WHEN OD.Quantity < T0.QuantityLimit THEN 0 ELSE 1 END, ErrorText = CASE WHEN OD.Quantity < T0.QuantityLimit THEN NULL ELSE N'Превышение допустимого количества' END
		FROM
			@OrderDetails AS OD
			CROSS APPLY (SELECT 1000 AS QuantityLimit FROM dbo.HardPriceTbl AS H WITH(NOLOCK) WHERE OD.ArticleID = H.MaterialID) AS T0
		 WHERE
			ErrorStatus = 0

		DECLARE @SheetErrorStatus AS BIT = (SELECT CASE WHEN EXISTS(SELECT 1 FROM @OrderDetails WHERE [ErrorStatus] = 1) THEN 1 ELSE 0 END)

		BEGIN TRANSACTION

		INSERT INTO dbo.B2BX_Files ([FileName], UserID) VALUES (@FileName, @UserID)
		SET @FileID = (SCOPE_IDENTITY())

		INSERT INTO dbo.B2BX_Sheets (FileID, SheetName, [FirstRow], [LastRow], ArticleColumn, QuantityColumn, ErrorStatus)
		VALUES (@FileID, @SheetName, @FirstRow, @LastRow, @ArticleColumn, @QuantityColumn, 0)
		DECLARE @SheetID AS INT = (SCOPE_IDENTITY())

		IF (EXISTS(SELECT 1 FROM @OrderDetails WHERE ErrorStatus = 1))
		BEGIN

			UPDATE dbo.B2BX_Files SET ErrorStatus = 1 WHERE [FileID] = @FileID
			UPDATE dbo.B2BX_Sheets SET ErrorStatus = 1 WHERE [SheetID] = @SheetID
			INSERT INTO dbo.B2BX_Errors (SheetID, RowNumber, ErrorText)
			SELECT @SheetID, RowNumber, ErrorText FROM @OrderDetails WHERE [ErrorStatus] = 1

			COMMIT TRANSACTION

			RETURN -1

		END

		IF (@OrderID = 0)
		BEGIN
			INSERT INTO dbo.B2BX_Orders (UserID, CustomerID)
			VALUES (@UserID, (SELECT CustomerID FROM dbo.B2BX_Users WHERE [UserID] = @UserID))
			SET @OrderID = SCOPE_IDENTITY()
		END
		ELSE
		BEGIN
			IF (NOT EXISTS(SELECT 1 FROM dbo.Orders WHERE [OrderID] = @OrderID))
			BEGIN
				RAISERROR(N'Заказ не найден', 16, 1)
			END
		END

		INSERT INTO dbo.B2BX_OrdersDetails (OrderID, ArticleID, Quantity, SheetID, SheetRow)
		SELECT @OrderID, ArticleID, Quantity, @SheetID, RowNumber
		FROM @OrderDetails

		COMMIT TRANSACTION

		RETURN 0

	END TRY
	BEGIN CATCH
	
		DECLARE @ERROR_MESSAGE AS NVARCHAR(2048)
		
		SET @ERROR_MESSAGE = ERROR_MESSAGE()
		
		IF (@@TRANCOUNT > 0) 
			ROLLBACK TRANSACTION
		
		RAISERROR('%s', 16, 1, @ERROR_MESSAGE)

		RETURN -2
	
	END CATCH	

	RETURN 0

END
GO
