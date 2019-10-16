USE [ASPB]
GO

/****** Object:  StoredProcedure [dbo].[B2BX_OrdersHistory]    Script Date: 16/10/19 12:43:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mikhail V. Kiselev
-- Create date: 13.10.2019
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[B2BX_OrdersHistory]
	@UserID		AS INT,
	@Criteria	AS NVARCHAR(255) = NULL
AS
BEGIN

	SET NOCOUNT ON;

	SET DATEFIRST 1;

	DECLARE @CustomerID AS INT = (SELECT CustomerID FROM dbo.B2BX_Users WITH(NOLOCK) WHERE [UserID] = @UserID)

	SELECT TOP(500)
		O.OrderID
		,U.UserID
		,U.UserName
		,O.CreateDate
		,O.CustomerRefNo
		,O.CustomerComments
		,O.Blocked
		,O.Placed
		,DATEPART(YYYY, O.CreateDate) AS TaxonomyYear
		,DATEPART(WW, O.CreateDate) AS TaxonomyWeek -- Use DATETBL for calc week no
		,1234567 AS SumValue
		,N'RUB' AS SumCurrency
	FROM
		dbo.B2BX_Orders AS O WITH(NOLOCK)
		INNER JOIN dbo.B2BX_Users AS U WITH(NOLOCK) ON U.UserID = O.UserID
		LEFT OUTER JOIN (
			SELECT DISTINCT
				OrderID
			FROM
				dbo.B2BX_OrdersDetails AS OD WITH(NOLOCK)
				INNER JOIN dbo.HardPriceTbl AS H WITH(NOLOCK) ON H.MaterialID = OD.ArticleID
			WHERE
				(@Criteria IS NULL OR H.PartID LIKE (N'%' + @Criteria + N'%'))
				OR (@Criteria IS NULL OR H.PartName LIKE (N'%' + @Criteria + N'%'))
				OR (@Criteria IS NULL OR H.DocPartName LIKE (N'%' + @Criteria + N'%'))
				OR (@Criteria IS NULL OR H.ManName LIKE (N'%' + @Criteria + N'%'))
				OR (@Criteria IS NULL OR H.ManufactPartID LIKE (N'%' + @Criteria + N'%'))
		) AS T0 ON T0.OrderID = O.OrderID
	WHERE
		U.CustomerID = @CustomerID
		AND (
			(@Criteria IS NULL OR O.CustomerRefNo LIKE (N'%' + @Criteria + N'%'))
			OR (@Criteria IS NULL OR O.CustomerComments LIKE (N'%' + @Criteria + N'%'))
		)

	RETURN 0

END
GO
