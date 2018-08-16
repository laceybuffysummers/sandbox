USE [Vega]
GO

IF NOT EXISTS (SELECT * FROM [Makers])
BEGIN 
	SET IDENTITY_INSERT [Makers] ON
	
	INSERT INTO [Makers] ([Id], [Name]) VALUES (1, N'AUDI')
	INSERT INTO [Makers] ([Id], [Name]) VALUES (2, N'BMW')
	INSERT INTO [Makers] ([Id], [Name]) VALUES (3, N'FORD')
	INSERT INTO [Makers] ([Id], [Name]) VALUES (4, N'HYUNDAI')
	INSERT INTO [Makers] ([Id], [Name]) VALUES (5, N'TOYOTA')
	
	SET IDENTITY_INSERT [Makers] OFF
END

IF NOT EXISTS (SELECT * FROM [Models])
BEGIN 
	SET IDENTITY_INSERT [Models] ON
	
	INSERT INTO [Models] ([Id], [MakerId], [Name]) VALUES (1, 1, N'A1')
	INSERT INTO [Models] ([Id], [MakerId], [Name]) VALUES (2, 1, N'A4')
	
	INSERT INTO [Models] ([Id], [MakerId], [Name]) VALUES (3, 2, N'X1')
	INSERT INTO [Models] ([Id], [MakerId], [Name]) VALUES (4, 2, N'3 Series')
	
	INSERT INTO [Models] ([Id], [MakerId], [Name]) VALUES (5, 3, N'Focus')
	INSERT INTO [Models] ([Id], [MakerId], [Name]) VALUES (6, 3, N'EcoSport')
	
	INSERT INTO [Models] ([Id], [MakerId], [Name]) VALUES (7, 4, N'i30')
	INSERT INTO [Models] ([Id], [MakerId], [Name]) VALUES (8, 4, N'i10')
	INSERT INTO [Models] ([Id], [MakerId], [Name]) VALUES (9, 4, N'ix20')
	
	INSERT INTO [Models] ([Id], [MakerId], [Name]) VALUES (10, 5, N'AYGO')
	INSERT INTO [Models] ([Id], [MakerId], [Name]) VALUES (11, 5, N'Prius')
	INSERT INTO [Models] ([Id], [MakerId], [Name]) VALUES (12, 5, N'Yaris')
	
	SET IDENTITY_INSERT [Models] OFF
END

IF NOT EXISTS (SELECT * FROM [Features])
BEGIN 
	SET IDENTITY_INSERT [Features] ON
	
	INSERT INTO [Features] ([Id], [Name]) VALUES (1, N'Cruise Control')
	INSERT INTO [Features] ([Id], [Name]) VALUES (2, N'4WD')
	INSERT INTO [Features] ([Id], [Name]) VALUES (3, N'Seat Heater(s)')
	INSERT INTO [Features] ([Id], [Name]) VALUES (4, N'Tow Hitch')
	INSERT INTO [Features] ([Id], [Name]) VALUES (5, N'Automatic transmission')
	INSERT INTO [Features] ([Id], [Name]) VALUES (6, N'DVD Video System')
	INSERT INTO [Features] ([Id], [Name]) VALUES (7, N'Third Row Seat')
	INSERT INTO [Features] ([Id], [Name]) VALUES (8, N'Sunroof')
	INSERT INTO [Features] ([Id], [Name]) VALUES (9, N'Navigation System')
	INSERT INTO [Features] ([Id], [Name]) VALUES (10, N'Leather Seats')
	
	SET IDENTITY_INSERT [Features] OFF
END

IF NOT EXISTS (SELECT * FROM [ModelsFeatures])
BEGIN 
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (1, 1)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (1, 2)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (1, 3)
	
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (2, 4)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (2, 5)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (2, 6)

	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (3, 7)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (3, 8)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (3, 9)

	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (4, 10)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (4, 1)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (4, 2)

	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (5, 3)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (5, 4)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (5, 5)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (5, 6)
	
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (6, 7)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (6, 8)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (6, 9)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (6, 10)

	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (7, 1)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (7, 2)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (7, 3)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (7, 4)

	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (8, 5)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (8, 6)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (8, 7)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (8, 8)

	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (9, 9)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (9, 10)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (9, 1)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (9, 2)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (9, 3)

	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (10, 4)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (10, 5)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (10, 6)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (10, 7)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (10, 8)

	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (11, 9)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (11, 10)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (11, 1)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (11, 2)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (11, 3)

	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (12, 4)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (12, 5)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (12, 6)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (12, 7)
	INSERT INTO [ModelsFeatures] ([ModelId], [FeatureId]) VALUES (12, 8)
END

IF NOT EXISTS (SELECT * FROM [Owners])
BEGIN 
	SET IDENTITY_INSERT [Owners] ON
	
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (1, N'Faustina', N'Ojeda', N'+1(704)352-9938', N'onestab@aol.com')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (2, N'Lenna', N'Odem', N'+1(816)395-2683', N'grdschl@mac.com')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (3, N'Clare', N'Caton', N'+1(556)762-1197', N'dbanarse@mac.com')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (4, N'Emilio', N'Napolitano', N'+1(347)863-4679', N'citadel@yahoo.com')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (5, N'Ellyn', N'Crayton', N'+1(260)470-2278', N'fudrucker@yahoo.com')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (6, N'Jess', N'Fegan', N'+1(607)521-3920', N'leviathan@sbcglobal.net')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (7, N'Reanna', N'Speller', N'+1(552)816-8974', N'syncnine@gmail.com')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (8, N'Ladawn', N'Clendening', N'+1(574)588-0325', N'sriha@live.com')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (9, N'Rea', N'Summa', N'+1(989)434-6264', N'smallpaul@sbcglobal.net')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (10, N'Porsha', N'Emily', N'+1(260)501-1255', N'jnolan@aol.com')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (11, N'Alessandra', N'Hilliker', N'+1(851)129-3241', N'nasor@att.net')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (12, N'Myron', N'Haggins', N'+1(282)973-4862', N'thaljef@verizon.net')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (13, N'Quinn', N'Searle', N'+1(928)613-8198', N'rgarton@outlook.com')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (14, N'Chester', N'Buckman', N'+1(743)856-6989', N'jimmichie@aol.com')
	INSERT INTO [Owners] ([Id], [FirstName], [LastName], [Phone], [Email]) 
		VALUES (15, N'Gilbert', N'Lisenby', N'+1(697)709-4532', N'fatelk@mac.com')
	
	
	SET IDENTITY_INSERT [Owners] OFF
END

IF NOT EXISTS (SELECT * FROM [Vehicles])
BEGIN 
	SET IDENTITY_INSERT [Vehicles] ON
	
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (1, 1, 1, 0, N'This metallic red sedan runs fine at most speeds. The styling features sweeping lines. It can go from 0-60 in 12.43 seconds and has a top speed of 104 mph. It has a torn-up interior and an electric engine.')

	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (2, 2, 2, 1, N'This pale silver convertible runs fine at most speeds. It can go from 0-60 in 10.72 seconds and has a top speed of 265 mph. The styling features acute angles. It handles relatively well. It has large blind spots and many cupholders.')

	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (3, 3, 3, 0, N'This yellow pickup runs great. The styling features asymmetry. It is fairly inexpensive. It has flames painted on it, a filthy interior and no cupholders. It can go from 0-60 in 18.39 seconds and has a top speed of 80 mph.')

	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (4, 4, 4, 1, N'This metallic green SUV runs fine at most speeds. The styling features smooth lines. It has a lowered body, an after-market stereo and a hybrid engine. It is 15 years old. It handles well. It is moderately priced. It can go from 0-60 in 9.50 seconds and has a top speed of 201 mph.')

	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (5, 5, 5, 0, N'This brown minivan is very noisy. The styling features many curves. It can go from 0-60 in 10.68 seconds and has a top speed of 84 mph.')

	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (6, 6, 6, 1, N'This mud-spattered red-orange sedan runs better than it looks. It can go from 0-60 in 12.38 seconds and has a top speed of 86 mph. It has flames painted on it and an electric engine. The styling features bland design. It is brand new. It is moderately expensive.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (7, 7, 6, 0, N'This pale gold SUV runs very quietly. It has a backup camera and an electric engine. It can go from 0-60 in 10.48 seconds and has a top speed of 239 mph. It handles extremely well. The styling features large angles.')
	
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (8, 8, 7, 1, N'This dented green SUV is in great mechanical condition. It has spinning rims, a dash computer and a diesel engine. It handles extremely well. It can go from 0-60 in 7.66 seconds and has a top speed of 225 mph. The styling features angled surfaces.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (9, 9, 7, 0, N'This gold sedan is in terrible mechanical shape. It can go from 0-60 in 12.21 seconds and has a top speed of 187 mph. It has improved safety features, extra-large tires and no cupholders. It handles fairly well. The styling features boxy structures.')

	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (10, 10, 8, 1, N'This gold crossover runs like it just got out of the shop. It is extremely expensive. It handles incredibly well.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (11, 11, 8, 0, N'This scratched up tan SUV is in great mechanical shape. It handles moderately well. The styling features smooth lines. It has a completely redone interior, spinning rims, a backup camera and a moonroof. It is moderately cheap.')

	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (12, 12, 9, 1, N'This pale grey van could use an oil change. The styling features unremarkable design. It can go from 0-60 in 16.7 seconds and has a top speed of 244 mph.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (13, 1, 9, 0, N'This dark red sedan is on the verge of an expensive breakdown. It is 10 years old. It has a custom paint job and a hybrid engine. The styling features unremarkable design. It handles fairly well. It can go from 0-60 in 13.80 seconds and has a top speed of 230 mph. It is very cheap.')

	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (14, 2, 10, 1, N'This turquoise crossover runs great. It handles very poorly. It is 14 years old. It has some panels painted different colors and an electric engine. It can go from 0-60 in 7.15 seconds and has a top speed of 175 mph.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (15, 3, 10, 0, N'This grimy green SUV runs better than it looks. It is very expensive. It has a trailer hitch, large blind spots, a turbo booster and many cupholders. It can go from 0-60 in 20.65 seconds and has a top speed of 156 mph. It handles well.')

	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (16, 4, 11, 1, N'This brown pickup has seen better days. It has extra-large tires and a hybrid engine. It handles incredibly well. The styling features unremarkable design. It can go from 0-60 in 2.76 seconds and has a top speed of 242 mph.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (17, 5, 11, 0, N'This beige sedan could use some major repairs. It has racing tires, a filthy interior and many cupholders. It can go from 0-60 in 9.97 seconds and has a top speed of 238 mph. The styling features boxy structures. It handles decently.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (18, 6, 11, 1, N'This dark red convertible could use an oil change. It handles fantastically. The styling features sweeping lines.')

	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (19, 7, 12, 0, N'This blue wagon is in great mechanical shape. The styling features asymmetry. It has heated seats, spinning rims, a dash computer and an electric engine. It handles fairly well.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (20, 8, 12, 1, N'This mud-spattered pale blue wagon is about to need a new transmission. It handles very well. It has a luggage rack, a lowered body and a hybrid engine. The styling features sleek lines.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (21, 9, 12, 0, N'This gray sports car is in decent shape. It has racing stripes and an electric engine. It can go from 0-60 in 2.4 seconds and has a top speed of 102 mph. The styling features many curves.')

	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (22, 10, 13, 1, N'This pale green sedan could use some major repairs. It has a filthy interior, a broken radio and a hybrid engine. The styling features angled surfaces. It can go from 0-60 in 20.49 seconds and has a top speed of 170 mph. It handles moderately well.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (23, 11, 13, 0, N'This beige pickup runs great aside from odd whistling noises. It can go from 0-60 in 11.92 seconds and has a top speed of 132 mph. It handles moderately well. The styling features blocky design. It has racing tires and a moonroof. It is relatively inexpensive.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (24, 12, 13, 1, N'This white minivan is in good shape overall. It can go from 0-60 in 1.50 seconds and has a top speed of 118 mph. The styling features angled surfaces. It is moderately priced.')

	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (25, 1, 14, 0, N'This dark grey compact car is very noisy. It handles superbly. It has racing tires, a trailer hitch, luxury features and a sunroof. It can go from 0-60 in 1.86 seconds and has a top speed of 144 mph. The styling features many curves.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (26, 2, 14, 1, N'This dirty dark silver convertible runs fine at most speeds. It has privacy glass, a luggage rack and a moonroof. It can go from 0-60 in 2.81 seconds and has a top speed of 213 mph. The styling features acute angles. It is 8 years old.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (27, 3, 14, 0, N'This beat-up pale grey sports car is in great mechanical shape. The styling features many curves. It handles well. It has a CB radio, a completely redone interior and a diesel engine. It is 14 years old.')

	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (28, 4, 15, 1, N'This pale blue wagon is very noisy. It is 14 years old. It handles fantastically. It has privacy glass and a hybrid engine. The styling features bland design.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (29, 5, 15, 0, N'This dirty dark red sedan runs better than it looks. It can go from 0-60 in 3.70 seconds and has a top speed of 127 mph. It has racing tires and a hybrid engine. It is 9 years old.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (30, 6, 15, 1, N'This filthy bright blue sedan is in decent shape. It is very overpriced. It has spinning rims, racing tires, heated seats and a sunroof. It can go from 0-60 in 15.19 seconds and has a top speed of 202 mph.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (31, 7, 15, 0, N'This bronze sedan could use a few repairs. It can go from 0-60 in 18.21 seconds and has a top speed of 190 mph. It handles extremely well. It has off-road suspension, a rebuilt engine and a moonroof.')
	INSERT INTO [Vehicles] ([Id], [ModelId], [OwnerId], [IsRegistered], [Description]) VALUES (32, 8, 15, 1, N'This grimy pale gold van is running very well. The styling features asymmetry. It can go from 0-60 in 3.7 seconds and has a top speed of 146 mph. It has large blind spots, a stick shift and a sunroof.')
	
	SET IDENTITY_INSERT [Vehicles] OFF
END

SELECT
	mk.[Name] AS 'Maker',
	m.[Name] AS 'Model',
	o.[FirstName] + ' ' + o.[LastName] AS 'Owner',
	v.[Description] AS 'Comments'
FROM [Vehicles] v 
INNER JOIN [Models] m ON v.[ModelId] = m.[Id]
INNER JOIN [Owners] o ON v.[OwnerId] = o.[Id]
INNER JOIN [Makers] mk ON m.[MakerId] = mk.[Id]

SELECT
	mk.[Name] AS 'Maker',
	m.[Name] AS 'Model',
	f.[Name] AS 'Feature'
FROM [Models] m 
INNER JOIN [Makers] mk ON m.[MakerId] = mk.[Id]
INNER JOIN [ModelsFeatures] mf ON m.[Id] = mf.[ModelId]
INNER JOIN [Features] f ON mf.[FeatureId] = f.[Id]
 