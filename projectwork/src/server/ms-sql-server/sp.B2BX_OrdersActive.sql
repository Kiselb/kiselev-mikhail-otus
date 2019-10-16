USE [ASPB]
GO

/****** Object:  StoredProcedure [dbo].[B2BX_OrdersActive]    Script Date: 16/10/19 12:42:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mikhail V. Kiselev
-- Create date: 14.10.2019
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[B2BX_OrdersActive]
	@UserID AS INT,
	@Mode	AS INT = 1
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
		,ShippingDueDate
		,ShippingAddress
		,ShippingContacts
		,ShippingComments
	FROM
		dbo.B2BX_Orders AS O WITH(NOLOCK)
		INNER JOIN dbo.B2BX_Users AS U WITH(NOLOCK) ON U.UserID = O.UserID
	WHERE
		(O.Blocked = 0 OR O.Placed = 0)
		AND
		((@Mode = 0 AND O.UserID = @UserID)	OR (@Mode = 1 AND U.CustomerID = @CustomerID))

	RETURN 0

END

GO
