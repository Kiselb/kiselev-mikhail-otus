USE [ASPB]
GO

/****** Object:  StoredProcedure [dbo].[B2BX_OrderFiles]    Script Date: 16/10/19 12:41:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mikhail V. Kiselev
-- Create date: 12.10.2019
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[B2BX_OrderFiles]
	@OrderID	AS INT
AS
BEGIN

	SET NOCOUNT ON;

	BEGIN TRY

		SELECT DISTINCT
			 F.FileID
			,F.[FileName]
			,F.CreateDate
			,F.ErrorStatus
			,U.UserID
			,U.UserName
			,T0.FileSheetsInfo
		FROM
			dbo.B2BX_OrdersDetails AS OD WITH(NOLOCK)
			INNER JOIN dbo.B2BX_Sheets AS S WITH(NOLOCK) ON S.SheetID = OD.SheetID
			INNER JOIN dbo.B2BX_Files AS F WITH(NOLOCK) ON F.FileID = S.FileID
			INNER JOIN dbo.B2BX_Users AS U WITH(NOLOCK) ON U.UserID = F.UserID
			LEFT OUTER JOIN (
				SELECT
					 FBASE.FileID
					,FileSheetsInfo = STUFF((SELECT
						',' + SheetName
						+ N': (Строки [' + CAST(S.[FirstRow] AS NVARCHAR(255))
						+ N' : ' + CAST(S.[LastRow] AS NVARCHAR(255))
						+ N'] Артикул: ' + CAST(S.[ArticleColumn] AS NVARCHAR(255))
						+ N' Количество: ' + CAST(S.[QuantityColumn] AS NVARCHAR(255))
						+ N')'
					FROM
						dbo.B2BX_Sheets AS S WITH(NOLOCK)
						INNER JOIN dbo.B2BX_Files AS F WITH(NOLOCK) ON F.FileID = S.FileID
					WHERE
						F.FileID = FBASE.FileID
					ORDER BY
						S.SheetName
					FOR XML PATH ('')), 1, 1, '')
				FROM
					dbo.B2BX_Files AS FBASE
			) AS T0 ON T0.FileID = F.FileID
		ORDER BY
			F.CreateDate DESC

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
