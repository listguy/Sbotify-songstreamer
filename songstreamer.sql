DROP DATABASE IF EXISTS `songstreamer`;
CREATE DATABASE `songstreamer`; 
USE `songstreamer`;

SET NAMES utf8 ;

CREATE TABLE `Users`(
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `is_admin` boolean DEFAULT FALSE,
  `preferences` varchar(4) DEFAULT NULL,
  `created_at` date NOT NULL,
  `remember_token` boolean DEFAULT FALSE,
  PRIMARY KEY (`user_id`)
  );
INSERT INTO `Users` VALUES (1, 'Nitzo', 'myemail', 'PASSWORD1!', true, null, CURDATE(), false);
  
CREATE TABLE `Artists`(
  `artist_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `media` varchar(100) NOT NULL,
  `uploaded_at` date NOT NULL,
  PRIMARY KEY (`artist_id`)
  );
INSERT INTO `Artists` 
	(artist_id,title,media,uploaded_at)
	VALUES (1, "Bring me The Horizon", "https://i.pinimg.com/736x/3e/01/16/3e01165a11fd19d65338b088d132b531.jpg", CURDATE());
  
CREATE TABLE `Albums`(
  `album_id` int NOT NULL AUTO_INCREMENT,
  `artist_id` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `media` varchar(120) NOT NULL,
  `created_at` date NOT NULL,
  `uploaded_at` date NOT NULL,
  PRIMARY KEY (`album_id`),
  FOREIGN KEY (`artist_id`) REFERENCES Artists(`artist_id`)
	ON DELETE CASCADE
    ON UPDATE CASCADE
  );
INSERT INTO `Albums` 
	(album_id,artist_id,title,media,created_at,uploaded_at)
    VALUES (1,1, "Sempiternal", "https://images-na.ssl-images-amazon.com/images/I/91Z82BKqrSL._AC_SL1500_.jpg", "2013-04-01",CURDATE());

  

CREATE TABLE `Songs` (
  `song_id` int NOT NULL AUTO_INCREMENT,
  `album_id` int NOT NULL,
  `artist_id` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `length` int NOT NULL,
  `track_number` int NOT NULL,
  `lyrics` text NOT NULL,
  `media` varchar(100) DEFAULT "No video available :(",
  `uploaded_at` date NOT NULL,
  `created_at` date NOT NULL,
  `views` int DEFAULT 0,
  PRIMARY KEY (`song_id`),
  FOREIGN KEY (`album_id`) REFERENCES Albums(`album_id`)
	ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`artist_id`) REFERENCES Artists(`artist_id`)
	ON DELETE CASCADE
    ON UPDATE CASCADE
  );
INSERT INTO `Songs` 
	(song_id,album_id,artist_id,title,length,track_number,lyrics,media,uploaded_at,created_at)
    VALUES (1,1,1, "Can You Feel My Heart", 227, 1, "BLA BLA", "https://www.youtube.com/watch?v=QJJYpsA5tv8", CURDATE(),  "2013-08-13"),
		   (2,1,1, "The House of Wolves", 227, 2, "BLU BLU", "https://www.youtube.com/watch?v=TN4GjxT1NDQ", CURDATE(),  "2013-08-13"),
		   (3,1,1, "Empire (Let Them Sing)", 227, 3, "BLE BLE", "https://www.youtube.com/watch?v=sA5hj7wuJLQ", CURDATE(),  "2013-08-13"),
		   (4,1,1, "Sleepwalking", 227, 4, "BLO BLO", "https://www.youtube.com/watch?v=lir3dzYIhz0", CURDATE(),  "2013-08-13"),
		   (5,1,1, "Go to Hell, for Heaben's Sake", 227, 5, "BLI BLI", "https://www.youtube.com/watch?v=C7cczTyQ4iY", CURDATE(),  "2013-08-13"),
		   (6,1,1, "Shadow Moses", 227, 6, "BLA BLA", "https://www.youtube.com/watch?v=-k9qDxyxS3s", CURDATE(),  "2013-08-13"),
           (7,1,1, "And The Snakes Start to Sing", 227, 7, "BLA BLA", "https://www.youtube.com/watch?v=mp3UVX6z9L8", CURDATE(),  "2013-08-13"),
           (8,1,1, "Seen It All Before", 227, 8, "BLA BLA", "https://www.youtube.com/watch?v=Q-_JIH466rg", CURDATE(),  "2013-08-13"),
           (9,1,1, "Antivist", 227, 9, "BLA BLA", "https://www.youtube.com/watch?v=9sZ5xTY8OMY", CURDATE(),  "2013-08-13"),
           (10,1,1, "Croocked Young", 227, 10, "BLA BLA", "https://www.youtube.com/watch?v=niGZ1nrVwqE", CURDATE(),  "2013-08-13"),
           (11,1,1, "Hospital for Souls", 227, 11, "BLA BLA", "https://www.youtube.com/watch?v=HjOSydtI38Q", CURDATE(),  "2013-08-13");

CREATE TABLE `Playlists` (
  `playlist_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `cover_img` varchar(100) NOT NULL,
  `uploaded_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`playlist_id`)
);

CREATE TABLE `SongsInPlayList` (
  `playlist_id` int NOT NULL,
  `song_id` int NOT NULL,
  PRIMARY KEY (`playlist_id`, `song_id`),
  FOREIGN KEY (`song_id`) REFERENCES Songs(`song_id`)
	ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`playlist_id`) REFERENCES Playlists(`playlist_id`)
	ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE `Preferences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `pref_id` int NOT NULL,
  `pref_type` varchar(8), -- preference type can only be one of the following: 'Albums', 'Artists', 'Songs', 'Playlists' 
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES Users(`user_id`)
  );
  
INSERT INTO `songstreamer`.`artists`(title, media, uploaded_at)
VALUES 
		("Avenged Sevenfold","https://images.jpost.com/image/upload/f_auto,fl_lossy/t_JD_ArticleMainImageFaceDetect/414781",CURDATE()),
        ("Of Mice & Men","https://images.kerrangcdn.com/Austin-Carlile-Of-Mice-And-Men.jpg?auto=compress&fit=crop&w=1200",CURDATE()),
        ("Bullet For My Valentine","https://www.exposedmagazine.co.uk/wp-content/uploads/2016/11/bullet-for-my-valentine.jpg",CURDATE()),
        ("21 Pilots","https://arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/SA3DSTDIINFITMPNFFARARYCGE.jpg",CURDATE()),
        ("J cole","https://static.onecms.io/wp-content/uploads/sites/20/2020/07/21/j-cole.jpg",CURDATE()),
        ("Kendrick Lamar","https://compote.slate.com/images/d9a99820-5841-4b90-bc20-cb3b86af7f65.jpg",CURDATE());
        
INSERT INTO `songstreamer`.`albums`(artist_id,title,media,created_at,uploaded_at)
VALUES 
		(2,"Avenged Sevenfold","https://upload.wikimedia.org/wikipedia/he/7/76/Avenged_Sevenfold_cover_2007.jpg","2007-08-014",CURDATE()),
        (2,"City of Evil","https://upload.wikimedia.org/wikipedia/he/7/7b/City_of_Evil_album_cover.jpg","2008-06-06",CURDATE()),
        (2,"Nightmare","https://cdn.shopify.com/s/files/1/0042/9119/9076/products/product-image-981338485_650x.jpg?v=1571731781","2010-08-06",CURDATE()),
        (3,"Of Mice & Men","https://i.pinimg.com/originals/69/b8/5e/69b85e03f4570ba9bd87b090d775b396.jpg","2012-03-07",CURDATE()),
        (3,"The Flood","https://upload.wikimedia.org/wikipedia/en/3/35/Of_Mice_%26_Men_The_Flood_cover.jpg","2013-04-23",CURDATE()),
        (3,"Restoring Force","https://upload.wikimedia.org/wikipedia/en/b/b7/Restoring_Force.jpg","2014-01-16",CURDATE()),
        (4,"Fever","https://images-na.ssl-images-amazon.com/images/I/51-tHNr5nRL.jpg","2010-02-10",CURDATE()),
        (4,"Scream Aim Fire","https://images-na.ssl-images-amazon.com/images/I/81QKcS%2BvqcL._SL1500_.jpg","2008-02-06",CURDATE()),
        (4,"Temper Temper","https://images-na.ssl-images-amazon.com/images/I/71rzjxT3xrL._SL1500_.jpg","2013-08-06",CURDATE()),
        (5,"Blurryface","https://i.pinimg.com/originals/7c/77/d0/7c77d047d98d3e3699efd08993bc6e1e.png","2015-04-06",CURDATE()),
        (5,"Trench","https://upload.wikimedia.org/wikipedia/he/e/ef/TOP_Trench_Album_Cover.jpg","2018-04-23",CURDATE()),
        (5,"Vessel","https://upload.wikimedia.org/wikipedia/he/2/20/Vessel_by_Twenty_One_Pilots.jpg","2013-11-11",CURDATE()),
        (6,"2014 Forest Hills Drive","https://www.beatnik.co.il/wp-content/uploads/2019/01/J.-COLE-2014-FOREST-HILLS-DRIVE.jpg","2014-08-18",CURDATE()),
        (6,"KOD","https://upload.wikimedia.org/wikipedia/he/d/d3/JColeKOD.jpg","2018-12-25",CURDATE()),
        (6,"Revenge Of The Dreams III","https://images-na.ssl-images-amazon.com/images/I/61KvrR9sBhL._SL1200_.jpg","2019-02-01",CURDATE()),
        (7,"good kid, m.A.A.d city","https://www.helicon.co.il/wp-content/uploads/2020/02/0602537192267.jpg","2012-06-08",CURDATE()),
        (7,"To Pimp A Butterfly","https://www.beatnik.co.il/wp-content/uploads/2018/07/KENDRICK-PIMP.jpg","2015-02-12",CURDATE()),
        (7,"DAMN.","https://www.helicon.co.il/wp-content/uploads/2017/04/klDAMN-600x600.jpg","2010-08-06",CURDATE());
        
INSERT INTO `songstreamer`.`songs`(album_id, artist_id, title, length, track_number, lyrics, media, uploaded_at, created_at)
VALUES 
		(2,2,"Critical Acclaim", 546, 1, "LYrics", "https://www.youtube.com/watch?v=UM9vgmOR9GU", CURDATE(), "2012-01-01"),
        (2,2,"Almost Easy", 466, 2, "LYrics", "https://www.youtube.com/watch?v=Fi_GN1pHCVc", CURDATE(), "2012-01-01"),
        (2,2,"Scream", 346, 3, "LYrics", "https://www.youtube.com/watch?v=Hg7lIkZdTPk", CURDATE(), "2012-01-01"),
        (3,2,"Beast and the Harlot", 557, 1, "LYrics", "https://www.youtube.com/watch?v=7bDg7n-chhU", CURDATE(), "2012-01-01"),
        (3,2,"Burn it Down", 557, 2, "LYrics", "https://www.youtube.com/watch?v=rNOgvZRzwP4", CURDATE(), "2012-01-01"),
        (3,2,"Blinded in Chains", 557, 3, "LYrics", "https://www.youtube.com/watch?v=TYgxM_suaUw", CURDATE(), "2012-01-01"),
        (4,2,"Nightmare", 657, 1, "LYrics", "https://www.youtube.com/watch?v=94bGzWyHbu0", CURDATE(), "2012-01-01"),
        (4,2,"Welcome to the Family", 467, 2, "LYrics", "https://www.youtube.com/watch?v=iJ-WsnaYDCg", CURDATE(), "2012-01-01"),
        (4,2,"Danger Line", 457, 3, "LYrics", "https://www.youtube.com/watch?v=w77ycjbCDbA", CURDATE(), "2012-01-01"),
		(5,3,"YDG", 245, 1, "LYrics", "https://www.youtube.com/watch?v=Csh496MAD_0", CURDATE(), "2012-01-01"),
		(5,3,"They Don't Call It the South for Nothing", 367, 2, "LYrics", "https://www.youtube.com/watch?v=JirzylJbhvY", CURDATE(), "2012-01-01"),
        (5,3,"Second & Sebring", 245, 3, "LYrics", "https://www.youtube.com/watch?v=qSeiG6qMhaI", CURDATE(), "2012-01-01"),
        (6,3,"O.G. Loko", 856, 1, "LYrics", "https://www.youtube.com/watch?v=9T8Q5Ef2Ql4", CURDATE(), "2012-01-01"),
        (6,3,"Ben Threw", 243, 2, "LYrics", "https://www.youtube.com/watch?v=TVvfzz4-sxY", CURDATE(), "2012-01-01"),
        (6,3,"Let Live", 254, 3, "LYrics", "https://www.youtube.com/watch?v=cwtQxD2eI5g", CURDATE(), "2012-01-01"),
        (7,3,"Public Service Announcement", 354, 1, "LYrics", "https://www.youtube.com/watch?v=u-ZLtwQpKE0", CURDATE(), "2012-01-01"),
        (7,3,"Feels Like Forever", 456, 2, "LYrics", "https://www.youtube.com/watch?v=xCGR9wEcqZs", CURDATE(), "2012-01-01"),
        (7,3,"Bones Exposed", 246, 3, "LYrics", "https://www.youtube.com/watch?v=IO-JbFtgeX4", CURDATE(), "2012-01-01"),
        (8,4,"Your Betrayal", 302, 1, "LYrics", "https://www.youtube.com/watch?v=IHgFJEJgUrg", CURDATE(), "2012-01-01"),
        (8,4,"Fever", 292, 2, "LYrics", "https://www.youtube.com/watch?v=lIQjj944jw0", CURDATE(), "2012-01-01"),
        (8,4,"The Last Fight", 234, 3, "LYrics", "https://www.youtube.com/watch?v=gT3zXBd2ksk", CURDATE(), "2012-01-01"),
        (9,4,"Scream Aim Fire", 278, 1, "LYrics", "https://www.youtube.com/watch?v=gqI-6xag8Mg", CURDATE(), "2012-01-01"),
        (9,4,"Waking the Demon", 288, 2, "LYrics", "https://www.youtube.com/watch?v=q2I0ulTZWXA", CURDATE(), "2012-01-01"),
        (9,4,"Say Goodnight", 294, 3, "LYrics", "https://www.youtube.com/watch?v=q2I0ulTZWXA", CURDATE(), "2012-01-01"),
        (10,4,"Temper Temper", 254, 1, "LYrics", "https://www.youtube.com/watch?v=kuF4YSPxL-E", CURDATE(), "2012-01-01"),
        (10,4,"Riot", 145, 2, "LYrics", "https://www.youtube.com/watch?v=IE9YmOprijk", CURDATE(), "2012-01-01"),
        (10,4,"Tears Don't Fall (Part 2)", 472, 3, "LYrics", "https://www.youtube.com/watch?v=gI7uQHPnq_s", CURDATE(), "2012-01-01"),
        (11,5,"Heavydirtysoul", 245, 1, "LYrics", "https://www.youtube.com/watch?v=r_9Kf0D5BTs", CURDATE(), "2012-01-01"),
        (11,5,"Stressed Out", 175, 2, "LYrics", "https://www.youtube.com/watch?v=pXRviuL6vMY", CURDATE(), "2012-01-01"),
        (11,5,"Ride", 198, 3, "LYrics", "https://www.youtube.com/watch?v=Pw-0pbY9JeU", CURDATE(), "2012-01-01"),
        (12,5,"Jumpsuit", 224, 1, "LYrics", "https://www.youtube.com/watch?v=UOUBW8bkjQ4", CURDATE(), "2012-01-01"),
        (12,5,"Morph", 236, 3, "LYrics", "https://www.youtube.com/watch?v=OmL9TqTFIAc", CURDATE(), "2012-01-01"),
        (12,5,"Nico and The Niners", 266, 9, "LYrics", "https://www.youtube.com/watch?v=hMAPyGoqQVw", CURDATE(), "2012-01-01"),
        (13,5,"Ode To Sleep", 321, 1, "LYrics", "https://www.youtube.com/watch?v=2OnO3UXFZdE", CURDATE(), "2012-01-01"),
        (13,5,"House of Golds", 190, 4, "LYrics", "https://www.youtube.com/watch?v=mDyxykpYeu8", CURDATE(), "2012-01-01"),
        (13,5,"Car Radio", 296, 3, "LYrics", "https://www.youtube.com/watch?v=92XVwY54h5k", CURDATE(), "2012-01-01"),
        (14,6,"January 28th", 134, 2, "LYrics", "https://www.youtube.com/watch?v=1vInvtJ3WxE", CURDATE(), "2012-01-01"),
        (14,6,"Wet Dreamz", 203, 3, "LYrics", "https://www.youtube.com/watch?v=eCGV26aj-mM", CURDATE(), "2012-01-01"),
        (14,6,"No Role Modelz", 227, 9, "LYrics", "https://www.youtube.com/watch?v=2RrhwDKw-j4", CURDATE(), "2012-01-01"),
        (15,6,"KOD", 184, 2, "LYrics", "https://www.youtube.com/watch?v=ciya_AQu25o", CURDATE(), "2012-01-01"),
        (15,6,"ATM", 190, 5, "LYrics", "https://www.youtube.com/watch?v=vUTI4bPdlgE", CURDATE(), "2012-01-01"),
        (15,6,"Motiv8", 143, 3, "LYrics", "https://www.youtube.com/watch?v=2hMy0rnHQv0", CURDATE(), "2012-01-01"),
        (16,6,"Under the Sun", 248, 1, "LYrics", "https://www.youtube.com/watch?v=eUUuI--jAlM", CURDATE(), "2012-01-01"),
        (16,6,"Down Bad", 198, 3, "LYrics", "https://www.youtube.com/watch?v=lIM1hejXzhw", CURDATE(), "2012-01-01"),
        (16,6,"Middle Child", 314, 16, "LYrics", "https://www.youtube.com/watch?v=e8CLsYzE5wk", CURDATE(), "2012-01-01"),
        (17,7,"Bitch Don't Kill My Vibe", 314, 2, "LYrics", "https://www.youtube.com/watch?v=GF8aaTu2kg0", CURDATE(), "2012-01-01"),
        (17,7,"Money Trees", 364, 5, "LYrics", "https://www.youtube.com/watch?v=Iy-dJwHVX84", CURDATE(), "2012-01-01"),
        (17,7,"m.A.A.d city", 284, 8, "LYrics", "https://www.youtube.com/watch?v=KKCSwOVudMo", CURDATE(), "2012-01-01"),
        (18,7,"Wesley's Theory", 197, 1, "LYrics", "https://www.youtube.com/watch?v=l9fN-8NjrvI", CURDATE(), "2012-01-01"),
        (18,7,"King Kunta", 172, 3, "LYrics", "https://www.youtube.com/watch?v=hRK7PVJFbS8", CURDATE(), "2012-01-01"),
        (18,7,"Alright", 182, 7, "LYrics", "https://www.youtube.com/watch?v=Z-48u_uWMHY", CURDATE(), "2012-01-01"),
        (19,7,"DNA.", 175, 3, "LYrics", "https://www.youtube.com/watch?v=NLZRYQMLDW4", CURDATE(), "2012-01-01"),
        (19,7,"HUMBLE.", 204, 8, "LYrics", "https://www.youtube.com/watch?v=tvTRZJ-4EyI", CURDATE(), "2012-01-01"),
        (19,7,"DUCKWORTH.", 215, 14, "LYrics", "https://www.youtube.com/watch?v=Dm-foWGDBF0", CURDATE(), "2012-01-01");
        
INSERT INTO `Playlists` (name,cover_img,uploaded_at,created_at)
VALUES 
		("Favorites", "https:/link", CURDATE(), "2020-09-13"),
		("Avenged Bangers", "https:/link", CURDATE(), "2019-09-13");
        
INSERT INTO `SongsInPlaylist` (playlist_id, song_id)
VALUES
		(1,1),
        (1,4),
        (1,6),
        (1,14),
        (1,16),
        (1,18),
        (2,12),
        (2,15),
        (2,17),
        (2,19)
		