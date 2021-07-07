const db = require("../config/db");

class Clan {
    static async findAll() {
        try {
            const result = await db.query(`SELECT * FROM clans`);
            const users = result.rows;

            return users;
        } catch(err) {
            throw new Error(err);
        }
    }

    static async create(name, game, userId) {
        try {
            const duplicateClanResult = await db.query(`SELECT name FROM clans WHERE name = $1`, [name]);
            const duplicateClan = duplicateClanResult.rows[0];

            if(duplicateClan) throw new Error("clan with that name already exists");

            const result = await db.query(
                `INSERT INTO clans (name, game) VALUES ($1, $2) RETURNING *`,
                [name, game]
            )

            const createdClan = result.rows[0];

            const userAndClanResult = await db.query(
                `INSERT INTO users_clans (user_id, clan_id) VALUES ($1, $2) RETURNING *`,
                [userId, createdClan.id]
            );
            
            return createdClan;
        } catch(err) {
            throw new Error(err);
        }
    }

    static async findByUserId(userId) {
        try {
            const result = await db.query(
                `SELECT clans.id, clans.name, clans.game, users_clans.user_id FROM clans INNER JOIN users_clans ON clans.id = users_clans.clan_id WHERE users_clans.user_id = $1`, 
            [userId]);
            const clans = result.rows;
            console.log(clans);
            return clans;
        } catch(err) {
            throw new Error(err);
        }
    }
}

module.exports = Clan;