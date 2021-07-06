const db = require("../config/db");
const bcrypt = require("bcrypt");

class User {
    static createUser(username, password){
        const query = db.query(`SELECT username FROM users WHERE username = $1`, [username]);
        const user = query.rows[0];

        if(user) throw new Error("user with that username already exists");

        const hashPassword = bcrypt.hash(password, 10);

        const result = db.query(
            `INSERT INTO users
             (username,
              password,
             )
             VALUES ($1, $2)
             RETURNING username, password`,
             [
                 username,
                 hashPassword
             ]
        )

        const createdUser = result.rows[0];

        return createdUser;
    }
}