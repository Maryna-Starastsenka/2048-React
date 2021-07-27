import sqlite3
from flask import Flask, render_template, request, url_for, flash, redirect, jsonify
from flask_cors import CORS
from werkzeug.exceptions import abort
import pymysql.cursors

def get_db_connection(type):
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='',
                                 db='game2048',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    conn = connection.cursor()

    if (type == "delete" or type == "edit" or type == "create" or type == "selectall"):
        conn = connection

    return conn

# SQL Queries
sql_select_all_users = "SELECT * FROM `users`"
sql_select_user_by_username = "SELECT * FROM `users` WHERE `username` = %s"
sql_verify_user = "SELECT * FROM `users` WHERE (`username` = %s AND `password` = %s)"
sql_get_user_by_username = "SELECT * FROM `users` WHERE `username` = %s"
sql_count_users = "SELECT COUNT(`userId`) AS `userCount` FROM `users`"
sql_count_online_users = "SELECT COUNT(`userId`) AS `onlineUserCount` FROM `users` WHERE `isOnline` = True"
sql_find_best_score = "SELECT MIN(NULLIF(`bestScore`, 0)) AS `bestGeneralScore` FROM `users`"
sql_find_user_best_score = "SELECT `bestScore` FROM `users` WHERE `userId` = %s"
sql_edit_user_score = "UPDATE `users` SET `bestScore` = %s WHERE `userId` = %s"
sql_edit_user_online_state = "UPDATE `users` SET `isOnline` = %s WHERE `userId` = %s"
sql_insert_user = "INSERT INTO `users` (`username`, `password`, `isAdmin`, `bestScore`, `isOnline`) VALUES (%s, %s, %s, %s, %s)"

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your secret key'
CORS(app)


@app.route('/users/register', methods=['POST'])
def register():
    username = request.get_json(force=True)['username']
    password = request.get_json(force=True)['password']
    isAdmin = request.get_json(force=True)['isAdmin']
    bestScore = 0
    isOnline = False

    conn = get_db_connection('create')
    cur = conn.cursor()
    cur.execute(sql_select_user_by_username, username)
    account = cur.fetchone()
    if account:
        message = 'Account with username ' + username \
            + ' already exists !'
        status = 'Failed'
    else:
        conn.cursor().execute(sql_insert_user, (username, password,
                              isAdmin, bestScore, isOnline))
        conn.commit()
        conn.close()

        message = 'User ' + username + ' was created'
        status = 'Success'

    return jsonify({'message': message, 'status': status})


@app.route('/users/login', methods=['POST'])
def login():
    username = request.get_json(force=True)['username']
    password = request.get_json(force=True)['password']

    conn = get_db_connection('selectall')
    cur = conn.cursor()
    cur.execute(sql_verify_user, (username, password))
    res = cur.fetchone()
    if res:
        message = 'User ' + username + ' has logged in'
        if 'isAdmin' in res:
            isAdmin = bool(res.get('isAdmin'))
        else:
            isAdmin = False

        cur.execute(sql_edit_user_online_state, (userId, True))

        return jsonify({'message': message, 'userId': res.get('userId'
                       ), 'isAdmin': isAdmin})
    else:
        message = 'Invalid username or password'
        return jsonify({'message': message})

    cur.close()
    conn.commit()
    conn.close()

@app.route('/users/logout', methods=['POST'])
def logout():
    userId = request.get_json(force=True)['userId']

    conn = get_db_connection('selectall')
    cur = conn.cursor()

    cur.execute(sql_edit_user_online_state, (userId, False))

    return jsonify({'message': 'User has logged out'})

@app.route('/score', methods=['GET'])
def getUserBestScore():
    userId = request.args.get("userId")

    conn = get_db_connection('selectall')
    cur = conn.cursor()
    cur.execute(sql_find_user_best_score, (userId))
    res = cur.fetchone()

    cur.close()
    conn.commit()
    conn.close()

    return jsonify(res)

@app.route('/score/general-best-score', methods=['GET'])
def getGeneralBestScore():

    conn = get_db_connection('selectall')
    cur = conn.cursor()
    cur.execute(sql_find_best_score)
    res = cur.fetchone()

    cur.close()
    conn.commit()
    conn.close()

    return jsonify(res)

@app.route('/admin-dashboard/table', methods=['GET'])
def getAdminDashBoardTable():

    conn = get_db_connection('selectall')
    cur = conn.cursor()
    cur.execute(sql_select_all_users)
    res = cur.fetchall()

    cur.close()
    conn.commit()
    conn.close()

    for index, value in enumerate(res):
        res[index]['isAdmin'] = bool(res[index].get('isAdmin'))
        res[index]['isOnline'] = bool(res[index].get('isOnline'))

    return jsonify(res)

@app.route('/admin-dashboard/user-count', methods=['GET'])
def getUserCount():

    conn = get_db_connection('selectall')
    cur = conn.cursor()
    cur.execute(sql_count_users)
    userCount = cur.fetchone()
    cur.execute(sql_count_online_users)
    onlineUserCount = cur.fetchone()

    cur.close()
    conn.commit()
    conn.close()

    return jsonify(
        dict(userCount, **onlineUserCount)
    )

@app.route('/user/edit-best-score', methods=['POST'])
def editUserScore():
    bestScore = request.get_json(force=True)['bestScore']
    userId = request.get_json(force=True)['userId']

    conn = get_db_connection('edit')
    cur = conn.cursor()
    cur.execute(sql_edit_user_score, (bestScore, userId))
    cur.fetchone()

    cur.close()
    conn.commit()
    conn.close()

    return jsonify({'message': "score is updated!", 'userId': userId, 'bestScore': bestScore})