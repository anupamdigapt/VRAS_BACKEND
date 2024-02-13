const db = require('../config/database');

class User {
  static async findByUsername(username) {
    const [rows, fields] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static async create(username, password) {
    const [result, fields] = await db.promise().execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    return result.insertId;
  }
}

module.exports = User;
