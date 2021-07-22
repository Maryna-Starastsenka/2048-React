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
    isAdmin BOOL DEFAULT FALSE NOT NULL,
    bestScore INT NOT NULL CHECK (bestScore > 0),
    isOnline BOOL NOT NULL,
    signUpDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userId)
);

INSERT INTO users (username, password, isAdmin, bestScore, isOnline) VALUES 
	("maryna", "maryna2048", True, 25, False),
	("julie", "111222", False, 35, False),
	("marc", "game2048", False, 32, False);

INSERT INTO users (username, password, isAdmin, bestScore, isOnline) VALUES 
	("michel", "12345", False, 30, True);


-- all users with info 
SELECT * FROM users;

-- user info 
SELECT * FROM users WHERE (userId = 3);
  
-- return user with username & password
SELECT * FROM users WHERE (username = "julie" AND password = "111222");

-- number of users
SELECT COUNT(userId) AS numberUsers FROM users;

-- number of online users
SELECT COUNT(userId) AS numberOnlineUsers FROM users WHERE (isOnline = True);

-- best score from the table
SELECT min(bestScore) AS score FROM users;

-- update user score
UPDATE users SET bestScore = 15 WHERE (userId = 4);