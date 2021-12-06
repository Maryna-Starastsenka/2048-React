/*
CREATE A NEW DATABASE :
mysql -u root -p 
CREATE DATABASE game2048;
USE game2048;
SHOW tables;
*/

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userId INT AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    isAdmin BOOL NOT NULL,
    bestScore INT,
    isOnline BOOL NOT NULL,
    signUpDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userId)
);

INSERT INTO users (username, password, isAdmin, bestScore, isOnline) VALUES 
	("maryna", "maryna2048", True, 25, False),
	("julie", "1122", False, 35, False),
	("marc", "game2048", False, 32, False);

INSERT INTO users (username, password, isAdmin, bestScore, isOnline) VALUES 
	("michel", "12345", True, 30, False);


-- all users with info 
SELECT * FROM users;

-- user info 
SELECT * FROM users WHERE (userId = 3);
  
-- return user with username & password
SELECT * FROM users WHERE (username = "julie" AND password = "1122");

-- number of users
SELECT COUNT(userId) AS numberUsers FROM users;

-- number of online users
SELECT COUNT(userId) AS numberOnlineUsers FROM users WHERE (isOnline = True);

-- best score from the table
SELECT MIN(bestScore) AS bestScoreFromDb FROM users;

-- update user score
UPDATE users SET bestScore = 15 WHERE (userId = 4);

-- update isOnline
UPDATE users SET isOnline = True WHERE (userId = 4);