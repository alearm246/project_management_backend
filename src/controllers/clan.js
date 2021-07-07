const Clan = require("../models/Clan");

const getClans = async (req, res) => {
    try {
        const users = await Clan.findAll();

        if(!users) return res.status(404).send("could not retrieve users");

        return res.status(200).send(users);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const getClanByUserId = async (req, res) => {
    try {
        const { id } = req.params;

        const clan = await Clan.findByUserId(id);

        if(!clan) return res.status(404).send("could not find clan by user id");

        return res.status(201).send(clan);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const createClan = async (req, res) => {
    try {
        const { name, game } = req.body;
        const { id } = req.user;

        const clan = await Clan.create(name, game, id);

        return res.status(201).send(clan);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
}

module.exports = {
    getClans,
    getClanByUserId,
    createClan,
}