const getUsers = async (req, res) => {
    try {
        return res.status(200).send("USERS");
    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    getUsers,
}