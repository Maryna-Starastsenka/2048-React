from flask import Flask, request, render_template
# https://github.com/PyMySQL/PyMySQL
import pymysql.cursors

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='root',
                             password='marynaSQL',
                             db='game2048',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

app = Flask(__name__)

cur = connection.cursor()

sql_drop = "DROP TABLE IF EXISTS `users`"
sql_create_table = "CREATE TABLE `users` (`userId` INT AUTO_INCREMENT,`username` VARCHAR(30) NOT NULL, `password` VARCHAR(30) NOT NULL, `isAdmin` BOOL NOT NULL, `bestScore` INT, `isOnline` BOOL NOT NULL, `signUpDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (userId))"
sql_insert_user = "INSERT INTO `users` (`username`, `password`, `isAdmin`, `bestScore`,`isOnline`) VALUES (%s, %s, %s, %s, %s)"

cur.execute(sql_drop)

cur.execute(sql_create_table)

cur.execute(
    sql_insert_user,
    ("maryna", "maryna2048", True, 25, False)
)

cur.execute(
    sql_insert_user,
    ("julie", "111222", False, 0, False)
)

cur.execute(
    sql_insert_user,
    ("marc", "game2048", True, 32, False)
)

cur.execute(
    sql_insert_user,
    ("michel", "12345", False, 0, True)
)

connection.commit()
connection.close()