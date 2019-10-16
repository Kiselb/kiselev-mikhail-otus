USE [ASPB]
GO

/****** Object:  StoredProcedure [dbo].[B2BX_ArticlesSearch]    Script Date: 16/10/19 12:40:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mikhail V. Kiselev
-- Create date: 16.10.2019
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[B2BX_ArticlesSearch]
	@UserID		AS INT,
	@Criteria	AS NVARCHAR(255)
AS
BEGIN

	SET NOCOUNT ON;

	DECLARE @Pattern AS NVARCHAR(255) = N'%' + @Criteria + N'%'

	SELECT
		 1 AS ResultType
		,MaterialID
		,PartID
		,ManufactPartID
		,PartName
		,DocPartName
	FROM
		dbo.HardPriceTbl AS H WITH(NOLOCK)
	WHERE
		H.PartID LIKE @Pattern

	UNION ALL

	SELECT
		 1 AS ResultType
		,MaterialID
		,PartID
		,ManufactPartID
		,PartName
		,DocPartName
	FROM
		dbo.HardPriceTbl AS H WITH(NOLOCK)
	WHERE
		H.ManufactPartID LIKE @Pattern

	UNION ALL

	SELECT
		 1 AS ResultType
		,MaterialID
		,PartID
		,ManufactPartID
		,PartName
		,DocPartName
	FROM
		dbo.HardPriceTbl AS H WITH(NOLOCK)
	WHERE
		H.PartName LIKE @Pattern

	UNION ALL

	SELECT
		 1 AS ResultType
		,MaterialID
		,PartID
		,ManufactPartID
		,PartName
		,DocPartName
	FROM
		dbo.HardPriceTbl AS H WITH(NOLOCK)
	WHERE
		H.DocPartName LIKE @Pattern

	RETURN 0

END
GO
