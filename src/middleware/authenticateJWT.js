const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
        const token = req.cookies.jwt;
        if(!token) return res.status(500).send("JWT is undefined");
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            try {
                if(err){
                    console.error("error verifying jwt: ", err);
                    return res.status(500).send(err);
                }
                req.user = {
                    id: user.user.id,
                    username: user.user.username
                }

                return next();
            } catch(err) {
                console.error(err);
            }
        })
}

module.exports = authenticateJWT;