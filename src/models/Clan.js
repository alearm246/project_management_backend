const db = require("../config/db");

class Clan {
    static async create(name, game, userId) {
        try {
            const duplicateClan = await db.query(`SELECT name FROM clans WHERE name = $1`, [name]);

            if(duplicateClan) throw new Error("clan with that name already exists");

            const result = await db.query(
                `INSERT INTO clans (name, game, user_id) VALUES ($1, $2) RETURNING *`,
                [name, game, userId]
            )

            const createdClan = result.rows[0];
            
            return createdClan;
        } catch(err) {
            console.error(err);
        }
    }

    static async findById(id) {
        try {
            const result = db.query(`SELECT * FROM clans WHERE id = $1`, [id]);
            const user = result.rows[0];

            return user;
        } catch(err) {
            console.error(err);
        }
    }
}

module.exports = Clan;