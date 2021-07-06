const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");

const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PLATFORM_API_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:3006", "http://localhost:3000"]
    })
)

app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.send("you've reached the server!");
})

app.listen(port, () => console.log(`server is running on port ${port}`));

db
  .connect()
  .then(() => console.log("connected to database..."))
  .catch(err => console.error("error connecting to the database: ", err.stack))
