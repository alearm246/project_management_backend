const { Client } = require("pg");

const db = new Client({
    user: "postgres",
    host: "db",
    database: "postgres",
    password: "postgres",
    port: 5432
})

module.exports = db;