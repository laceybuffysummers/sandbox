USE [master]

-- Delete database
IF EXISTS (SELECT * FROM [master].[dbo].[sysdatabases] WHERE name = 'Vega')
BEGIN    
	ALTER DATABASE [Vega] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [Vega];    
END
GO

-- Delete login
IF EXISTS 
    (SELECT [name]
     FROM [sys].[server_principals]
     WHERE [name] = 'Vega')
BEGIN
	DROP LOGIN [Vega]
END 
GO