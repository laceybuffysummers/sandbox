USE [master]

-- Create database
IF NOT EXISTS (SELECT * FROM [master].[dbo].[sysdatabases] WHERE name = 'Vega')
BEGIN    
    CREATE DATABASE [Vega]
    COLLATE SQL_Latin1_General_CP1_CI_AS;      
END
GO

-- Create login
IF NOT EXISTS 
    (SELECT [name]
     FROM [sys].[server_principals]
     WHERE [name] = 'Vega')
BEGIN
	CREATE LOGIN [Vega] 
		WITH PASSWORD=N'DbPassword!234', 
		DEFAULT_DATABASE=[Vega], 
		DEFAULT_LANGUAGE=[us_english], 
		CHECK_EXPIRATION=OFF, 
		CHECK_POLICY=OFF
END 
GO

USE [Vega]
GO

-- Create user
IF NOT EXISTS 
    (SELECT [name]
     FROM [sys].[database_principals]
     WHERE [name] = 'Vega')
BEGIN
	CREATE USER [Vega] FOR LOGIN [Vega] WITH DEFAULT_SCHEMA=[dbo]
	
	EXEC sp_addrolemember N'db_owner', N'Vega'
END
GO
