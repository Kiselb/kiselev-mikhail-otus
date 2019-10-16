USE [ASPB]
GO

/****** Object:  StoredProcedure [dbo].[B2BX_OrderDetails]    Script Date: 16/10/19 15:58:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mikhail V. Kiselev
-- Create date: 16.10.2019
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[B2BX_OrderDetails]
	@UserID		AS INT,
	@OrderID	AS INT
AS
BEGIN

	SET NOCOUNT ON;

	SELECT
		 OD.DetailsID
		,OD.Quantity
		,F.FileID
		,F.[FileName]
		,OD.SheetID
		,S.SheetName
		,OD.SheetRow
		,H.MaterialID
		,H.PartID
		,H.ManufactPartID
		,H.PartName
		,H.DocPartName
	FROM
		dbo.B2BX_OrdersDetails AS OD WITH(NOLOCK)
		INNER JOIN dbo.HardPriceTbl AS H WITH(NOLOCK) ON H.MaterialID = OD.ArticleID
		LEFT OUTER JOIN dbo.B2BX_Sheets AS S WITH(NOLOCK) ON S.SheetID = OD.SheetID
		LEFT OUTER JOIN dbo.B2BX_Files AS F WITH(NOLOCK) ON F.FileID = S.FileID
	WHERE
		OD.OrderID = @OrderID

	RETURN 0

END
GO
