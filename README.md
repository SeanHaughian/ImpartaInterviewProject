CREATE TABLE [dbo].[Tasks] (
    [ID]          INT            IDENTITY (1, 1) NOT NULL,
    [Description] NVARCHAR (255) UNIQUE NOT NULL,
    [Status]      NVARCHAR (255) NOT NULL,
    [Type]        NVARCHAR (255) NOT NULL,
    [Priority]    NVARCHAR (255)
    CONSTRAINT [PK_Tasks_ID] PRIMARY KEY CLUSTERED ([ID] ASC)
);

INSERT [dbo].[Tasks] ([Description], [Status], [Type], [Priority]) VALUES ('Broken Access Control', 'In Progress', 'Bug', 'Critical')
INSERT [dbo].[Tasks] ([Description], [Status], [Type], [Priority]) VALUES ('Cryprographic Failures', 'In Progress', 'Bug', 'Critical')
INSERT [dbo].[Tasks] ([Description], [Status], [Type], [Priority]) VALUES ('Injection', 'In Progress', 'Epic', 'Critical')
INSERT [dbo].[Tasks] ([Description], [Status], [Type], [Priority]) VALUES ('Insecure Design', 'In Progress', 'Task', 'Major')
INSERT [dbo].[Tasks] ([Description], [Status], [Type], [Priority]) VALUES ('Security Misconfiguration', 'In Progress', 'Task', 'Major')
INSERT [dbo].[Tasks] ([Description], [Status], [Type], [Priority]) VALUES ('Vulnerable and Outdated Comments', 'Pending', 'Spike', 'Moderate')
INSERT [dbo].[Tasks] ([Description], [Status], [Type], [Priority]) VALUES ('Identification and Authentication Failures', 'Pending', 'Spike', 'Moderate')
INSERT [dbo].[Tasks] ([Description], [Status], [Type], [Priority]) VALUES ('Software and Data Integrity Failures', 'Pending', 'Bug', 'Minor')
INSERT [dbo].[Tasks] ([Description], [Status], [Type], [Priority]) VALUES ('Security Logging and Monitoring Failures', 'Completed', 'Bug', 'Minor')
INSERT [dbo].[Tasks] ([Description], [Status], [Type], [Priority]) VALUES ('Server Sider Forgery', 'Completed', 'Bug', 'Critical')