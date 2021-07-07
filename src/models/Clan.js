const db = require("../config/db");

class Clan {
    static async findAll() {
        try {
            const result = await db.query(`SELECT * FROM clans`);
            const users = result.rows;

            return users;
        } catch(err) {
            console.error(err);
            throw new Error(err);
        }
    }

    static async create(name, game, userId) {
        try {
            const duplicateClanResult = await db.query(`SELECT name FROM clans WHERE name = $1`, [name]);
            const duplicateClan = duplicateClanResult.rows[0];

            if(duplicateClan) throw new Error("clan with that name already exists");

            const result = await db.query(
                `INSERT INTO clans (name, game, user_id) VALUES ($1, $2, $3) RETURNING *`,
                [name, game, userId]
            )

            const createdClan = result.rows[0];
            
            return createdClan;
        } catch(err) {
            console.error(err);
            throw new Error(err);
        }
    }

    static async findByUserId(id) {
        try {
            const result = await db.query(`SELECT * FROM clans WHERE user_id = $1`, [id]);
            const clans = result.rows;

            return clans;
        } catch(err) {
            console.error(err);
            throw new Error(err);
        }
    }
}

module.exports = Clan;