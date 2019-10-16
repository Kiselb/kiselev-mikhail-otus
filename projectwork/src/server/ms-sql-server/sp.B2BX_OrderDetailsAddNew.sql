USE [ASPB]
GO

/****** Object:  StoredProcedure [dbo].[B2BX_OrderDetailsAddNew]    Script Date: 16/10/19 15:58:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mikhail V. Kiselev
-- Create date: 16.10.2019
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[B2BX_OrderDetailsAddNew]
	@UserID			AS INT,
	@OrderID		AS INT,
	@ArticleID		AS INT,
	@Quantity		AS INT,
	@OrderDetailsID	AS INT OUTPUT
AS
BEGIN

	SET NOCOUNT ON;

	BEGIN TRY

		BEGIN TRANSACTION

		INSERT INTO dbo.B2BX_OrdersDetails (OrderID, ArticleID, Quantity)
		VALUES (@OrderID, @ArticleID, @Quantity)

		SET @OrderDetailsID = SCOPE_IDENTITY()

		COMMIT TRANSACTION

		RETURN 0

	END TRY
	BEGIN CATCH
	
		DECLARE @ERROR_MESSAGE AS NVARCHAR(2048)
		
		SET @ERROR_MESSAGE = ERROR_MESSAGE()
		
		IF (@@TRANCOUNT > 0) 
			ROLLBACK TRANSACTION
		
		RAISERROR('%s', 16, 1, @ERROR_MESSAGE)

		RETURN -1
	
	END CATCH

	RETURN 0

END
GO
