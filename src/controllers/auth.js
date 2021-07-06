const passport = require("passport");
const jwt = require('jsonwebtoken');

const COOKIES_OPTS = { sameSite: "None", secure: true, httpOnly: true, maxAge: "86400000" };

const signUp = (req, res) => {
    try {
        res.status(201).send("signup successful");
    } catch(err) {
        console.error(err);
    }
}

const login = async (req, res) => {
    passport.authenticate("login", async (err, user) => {
        try {
            if(err) {
                console.log(err);
                return res.status(500).send(`err: ${err}`);
            }
            if(!user) return res.status(404).send("username and password are required");
            // Used to establish login session
            req.login(user, { session: false }, (err) => {
                if(err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
                // create our jwttoken
                const body = {
                    id: user.id,
                    username: user.username
                };

                const token = jwt.sign(
                { user: body },
                process.env.JWT_SECRET,
                { expiresIn: 86400 }
                );

                // Store tokens in cookie
                // If in dev environment, disable sameSite/secure checks
                if(process.env.NODE_ENV === "development"){
                    res.cookie('jwt', token);
                }
                else{
                    res.cookie('jwt', token, COOKIES_OPTS);
                }
                return res.status(200).send("successfully logged in");
            })
        } catch(err) {
            console.error("error with passport login: ", err);
            return res.status(500).send(err);
        }
    })(req, res);
}

const logout = (req, res) => {
    try{
        if(process.env.NODE_ENV === "development"){
            res.clearCookie("jwt");
        }
        else{
            res.clearCookie("jwt", COOKIES_OPTS);
        }
        res.status(200).send("logged out");
    } catch(err) {
        console.error(err);
    }
    
}

module.exports = {
    signUp,
    login,
    logout
}