/****** Object:  Table [dbo].[B2BX_Users]    Script Date: 09/10/19 21:10:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[B2BX_Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](255) NOT NULL,
	[CustomerID] [int] NOT NULL,
	[Password] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_B2BX_Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[B2BX_Files]    Script Date: 09/10/19 21:07:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[B2BX_Files](
	[FileID] [int] IDENTITY(1,1) NOT NULL,
	[FileName] [nvarchar](255) NOT NULL,
	[UserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[ErrorStatus] [bit] NOT NULL,
 CONSTRAINT [PK_B2BX_Files] PRIMARY KEY CLUSTERED 
(
	[FileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[B2BX_Files] ADD  CONSTRAINT [DF_B2BX_Files_CreateDate]  DEFAULT (getdate()) FOR [CreateDate]
GO

ALTER TABLE [dbo].[B2BX_Files] ADD  CONSTRAINT [DF_B2BX_Files_ErrorStatus]  DEFAULT ((0)) FOR [ErrorStatus]
GO

ALTER TABLE [dbo].[B2BX_Files]  WITH CHECK ADD  CONSTRAINT [FK_B2BX_Files_B2BX_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[B2BX_Users] ([UserID])
GO

ALTER TABLE [dbo].[B2BX_Files] CHECK CONSTRAINT [FK_B2BX_Files_B2BX_Users]
GO

/****** Object:  Table [dbo].[B2BX_Orders]    Script Date: 09/10/19 21:08:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[B2BX_Orders](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[CustomerID] [int] NOT NULL,
	[CustomerRefNo] [nvarchar](255) NULL,
	[CustomerComments] [nvarchar](max) NULL,
	[Blocked] [bit] NOT NULL,
	[Placed] [bit] NOT NULL,
 CONSTRAINT [PK_B2BX_Orders] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[B2BX_Orders] ADD  CONSTRAINT [DF_B2BX_Orders_CreateDate]  DEFAULT (getdate()) FOR [CreateDate]
GO

ALTER TABLE [dbo].[B2BX_Orders] ADD  CONSTRAINT [DF_B2BX_Orders_Blocked]  DEFAULT ((0)) FOR [Blocked]
GO

ALTER TABLE [dbo].[B2BX_Orders] ADD  CONSTRAINT [DF_B2BX_Orders_Placed]  DEFAULT ((0)) FOR [Placed]
GO

ALTER TABLE [dbo].[B2BX_Orders]  WITH CHECK ADD  CONSTRAINT [FK_B2BX_Orders_B2BX_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[B2BX_Users] ([UserID])
GO

ALTER TABLE [dbo].[B2BX_Orders] CHECK CONSTRAINT [FK_B2BX_Orders_B2BX_Users]
GO

/****** Object:  Table [dbo].[B2BX_OrdersDetails]    Script Date: 09/10/19 21:09:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[B2BX_OrdersDetails](
	[DetailsID] [int] IDENTITY(1,1) NOT NULL,
	[OrderID] [int] NOT NULL,
	[ArticleID] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[SheetID] [int] NOT NULL,
	[SheetRow] [int] NULL,
 CONSTRAINT [PK_B2BX_OrdersDetails] PRIMARY KEY CLUSTERED 
(
	[DetailsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[B2BX_OrdersDetails]  WITH CHECK ADD  CONSTRAINT [FK_B2BX_OrdersDetails_B2BX_Orders] FOREIGN KEY([OrderID])
REFERENCES [dbo].[B2BX_Orders] ([OrderID])
GO

ALTER TABLE [dbo].[B2BX_OrdersDetails] CHECK CONSTRAINT [FK_B2BX_OrdersDetails_B2BX_Orders]
GO

ALTER TABLE [dbo].[B2BX_OrdersDetails]  WITH CHECK ADD  CONSTRAINT [FK_B2BX_OrdersDetails_B2BX_Sheets] FOREIGN KEY([SheetID])
REFERENCES [dbo].[B2BX_Sheets] ([SheetID])
GO

ALTER TABLE [dbo].[B2BX_OrdersDetails] CHECK CONSTRAINT [FK_B2BX_OrdersDetails_B2BX_Sheets]
GO

/****** Object:  Table [dbo].[B2BX_Sheets]    Script Date: 09/10/19 21:10:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[B2BX_Sheets](
	[SheetID] [int] IDENTITY(1,1) NOT NULL,
	[FileID] [int] NOT NULL,
	[SheetName] [nvarchar](255) NOT NULL,
	[FirstRow] [int] NOT NULL,
	[LastRow] [int] NOT NULL,
	[ArticleColumn] [int] NOT NULL,
	[QuantityColumn] [int] NOT NULL,
	[ErrorStatus] [bit] NOT NULL,
 CONSTRAINT [PK_B2BX_Sheets] PRIMARY KEY CLUSTERED 
(
	[SheetID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[B2BX_Sheets] ADD  CONSTRAINT [DF_B2BX_Sheets_ErrorStatus]  DEFAULT ((0)) FOR [ErrorStatus]
GO

ALTER TABLE [dbo].[B2BX_Sheets]  WITH CHECK ADD  CONSTRAINT [FK_B2BX_Sheets_B2BX_Files] FOREIGN KEY([FileID])
REFERENCES [dbo].[B2BX_Files] ([FileID])
GO

ALTER TABLE [dbo].[B2BX_Sheets] CHECK CONSTRAINT [FK_B2BX_Sheets_B2BX_Files]
GO

/****** Object:  Table [dbo].[B2BX_Errors]    Script Date: 09/10/19 21:06:16 ******/

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[B2BX_Errors](
	[ErrorID] [int] IDENTITY(1,1) NOT NULL,
	[SheetID] [int] NOT NULL,
	[RowNumber] [int] NOT NULL,
	[ErrorText] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_B2BX_Errors] PRIMARY KEY CLUSTERED 
(
	[ErrorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[B2BX_Errors]  WITH CHECK ADD  CONSTRAINT [FK_B2BX_Errors_B2BX_Sheets] FOREIGN KEY([SheetID])
REFERENCES [dbo].[B2BX_Sheets] ([SheetID])
GO

ALTER TABLE [dbo].[B2BX_Errors] CHECK CONSTRAINT [FK_B2BX_Errors_B2BX_Sheets]
GO
