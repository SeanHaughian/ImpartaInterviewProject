CREATE TABLE [dbo].[Users] (
    [ID]				UNIQUEIDENTIFIER DEFAULT (newid()) NULL,
    [Firstname]			NVARCHAR (255)    NOT NULL,
    [Surname]			NVARCHAR (255)    NOT NULL,
    [Email]				NVARCHAR (255)    NOT NULL,
    [Password]			NVARCHAR (255)    NOT NULL,
    [PhotoFileName]     NVARCHAR (500)    NULL
);

CREATE TABLE [dbo].[Tasks] (
    [ID]          INT   IDENTITY (1, 1) NOT NULL,
    [UserID]      UNIQUEIDENTIFIER DEFAULT (newid()) NULL,
    [Name]        NVARCHAR (255) NOT NULL,
    [Description] NVARCHAR (255) NOT NULL,
    [Status]      NVARCHAR (255) NOT NULL,
    [Type]        NVARCHAR (255) NOT NULL,
    [Priority]    NVARCHAR (255)
    CONSTRAINT [PK_Tasks_ID] PRIMARY KEY CLUSTERED ([ID] ASC)
);