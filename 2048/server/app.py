import sqlite3
from flask import Flask, render_template, request, url_for, flash, redirect, jsonify
from flask_cors import CORS
from werkzeug.exceptions import abort
import pymysql.cursors

def get_db_connection(type):
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='marynaSQL',
                                 db='game2048',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    conn = connection.cursor()

    if (type == "delete" or type == "edit" or type == "create" or type == "selectall"):
        conn = connection

    return conn

# SQL Queries
sql_select_all_users = "SELECT * FROM `users`"
sql_select_one_user = "SELECT * FROM `users` WHERE `userId` = %s"
sql_verify_user = "SELECT * FROM `users` WHERE (`username` = %s AND `password` = %s)"
sql_get_user_by_username = "SELECT * FROM `users` WHERE `username` = %s"
sql_count_users = "SELECT COUNT(`userId`) AS `numberUsers` FROM `users`"
sql_count_online_users = "SELECT COUNT(`userId`) AS `numberOnlinesers` FROM `users` WHERE `isOnline` = %s"
sql_find_best_score = "SELECT MIN(`bestScore`) AS `bestScoreFromDb` FROM `users`"
sql_update_score = "UPDATE `users` SET `bestScore` = %s WHERE `userId` = %s"
sql_insert_user = "INSERT INTO `users` (`username`, `password`, `isAdmin`, `bestScore`, `isOnline`) VALUES (%s, %s, %s, %s, %s)"

# def get_post(post_id):
#    conn = get_db_connection("select")
#    conn.execute(sql_select_one, (post_id,))
#    post = conn.fetchone()
#    conn.close()
#    if post is None:
#        abort(404)
#    return post


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
    cur.execute('SELECT * FROM users WHERE username = % s', username)
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

        return jsonify({'message': message, 'userId': res.get('userId'
                       ), 'isAdmin': isAdmin})
    else:
        message = 'Invalid username or password'
        return jsonify({'message': message})

    cur.close()
    conn.commit()
    conn.close()

# @app.route('/')
# def index():
#     conn = get_db_connection("selectall")
#     conn.execute(sql_select_all_users)
#     posts = conn.fetchall()
#     conn.close()
#     return render_template('index.html', posts=posts)


# @app.route('/<int:post_id>')
# def post(post_id):
#     post = get_post(post_id)
#     return render_template('post.html', post=post)


# @app.route('/create', methods=('GET', 'POST'))
# def create():
#     if request.method == 'POST':
#         title = request.form['title']
#         content = request.form['content']

#         if not title:
#             flash('Title is required!')
#         else:
#             conn = get_db_connection("create")
#             conn.cursor().execute(sql_insert,
#                          (title, content))
#             conn.commit()
#             conn.close()
#             return redirect(url_for('index'))

#     return render_template('create.html')


# @app.route('/<int:id>/edit', methods=('GET', 'POST'))
# def edit(id):
#     post = get_post(id)

#     if request.method == 'POST':
#         title = request.form['title']
#         content = request.form['content']

#         if not title:
#             flash('Title is required!')
#         else:
#             conn = get_db_connection("edit")
#             conn.cursor().execute(sql_update,
#                          (title, content, id))
#             conn.commit()
#             conn.close()
#             return redirect(url_for('index'))

#     return render_template('edit.html', post=post)


# @app.route('/<int:id>/delete', methods=('POST',))
# def delete(id):
#     post = get_post(id)
#     conn = get_db_connection("delete")
#     conn.cursor().execute(sql_delete, (id,))
#     conn.commit()
#     conn.close()
#     flash('"{}" was successfully deleted!'.format(post['title']))
#     return redirect(url_for('index'))
