USE [ASPB]
GO

/****** Object:  StoredProcedure [dbo].[B2BX_ArticlesSearch]    Script Date: 17/10/19 11:13:33 ******/
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

	DECLARE @RESULT_TYPE_PARTID			AS INT = 1
	DECLARE @RESULT_TYPE_MANUFPARTID	AS INT = 2
	DECLARE @RESULT_TYPE_PARTNAME		AS INT = 3
	DECLARE @RESULT_TYPE_DOCPARTNAME	AS INT = 4

	DECLARE @Pattern AS NVARCHAR(255) = N'%' + @Criteria + N'%'

	SELECT
		 @RESULT_TYPE_PARTID AS ResultType
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
		 @RESULT_TYPE_MANUFPARTID AS ResultType
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
		 @RESULT_TYPE_PARTNAME AS ResultType
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
		 @RESULT_TYPE_DOCPARTNAME AS ResultType
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
