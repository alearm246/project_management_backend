const db = require("../config/db");
const bcrypt = require("bcrypt");

class User {
    static async findOne(username) {
        const result = await db.query(`SELECT * FROM users WHERE username = $1`, [username]);
        const user = result.rows[0];
        
        return user;
    }

    static async findById(id) {
        const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
        const user = result.rows[0];

        return user;
    }

    static async create(username, password){
        const query = await db.query(`SELECT username FROM users WHERE username = $1`, [username]);
        const user = query.rows[0];

        if(user) throw new Error("user with that username already exists");

        const hashPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username, password`,
             [
                 username,
                 hashPassword
             ]
        );

        const createdUser = result.rows[0];

        return createdUser;
    }

    static async isValidPassword(id, password){
        const result = await db.query(`SELECT password FROM users WHERE id = $1`, [id]);
        const user = result.rows[0];

        return await bcrypt.compare(password, user.password);
    }
}

module.exports = User;