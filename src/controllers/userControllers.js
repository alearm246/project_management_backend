const getUsers = (req, res) => {
    try {
        return res.status(200).send("USERS");
    } catch(err) {
        console.error(err);
    }
}

const createUser = (req, res) => {
    try {
        const { username, password } = req.body;
        return res.status(200).send({username, password});
    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    getUsers,
    createUser,
}