const express = require("express");
const passport = require("passport");
const router = express.Router();

const { signUp, login, logout } = require("../controllers/auth");

router.post("/signup", passport.authenticate('signup', { session: false }), signUp);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;