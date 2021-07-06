const getUsers = async (req, res) => {
    try {
        return res.status(200).send("USERS");
    } catch(err) {
        console.error(err);
    }
}

const currentUser = async (req, res) => {
    try {
        const currentUser = req.user;
        if(!currentUser) return res.status(404).send("couldn't retrieve user");

        return res.status(200).send(currentUser);
    } catch(err){
        console.error(err);
    }
}

module.exports = {
    getUsers,
    currentUser
}