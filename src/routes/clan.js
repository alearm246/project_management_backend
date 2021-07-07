const express = require('express');
const router = express.Router();

const { getClans, getClanByUserId, createClan } = require("../controllers/clan");

router.get("/clans", getClans);
router.get("/:id/clans", getClanByUserId);
router.post("/clans", createClan);

module.exports = router;