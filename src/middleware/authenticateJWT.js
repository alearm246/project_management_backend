const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateJWT = (req, res, next) => {
        const token = req.cookies.jwt;
        if(!token) return res.status(500).send("JWT is undefined");
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            try {
                if(err){
                    console.error("error verifying jwt: ", err);
                    return res.status(500).send(err);
                }
                const currentUser = await User.findById(user.user.id);

                req.user = {
                    id: currentUser.id,
                    username: currentUser.username
                }

                return next();
            } catch(err) {
                console.error(err);
            }
        })
}

module.exports = authenticateJWT;