const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PLATFORM_API_PORT || 3000;

app.get("/", (req, res) => {
    res.send("you've reached the server!");
})

app.listen(port, () => console.log(`server is running on port ${port}`));
