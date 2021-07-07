const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const db = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const clanRoutes = require("./routes/clan");

const authenticateJWT = require("./middleware/authenticateJWT");

const app = express();
const port = process.env.PLATFORM_API_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3005", "http://localhost:3000"]
    })
)
app.use(passport.initialize());


require("./auth/local");

app.use("/auth", authRoutes);
app.use("/users", authenticateJWT, userRoutes, clanRoutes);

app.get("/", (req, res) => {
    res.send("you've reached the server!");
})

app.listen(port, () => console.log(`server is running on port ${port}`));

db
  .connect()
  .then(() => console.log("connected to database..."))
  .catch(err => console.error("error connecting to the database: ", err.stack))
