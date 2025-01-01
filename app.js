const express = require("express");
const path = require("node:path");
const pool = require("./db/pool");
const passport_stuff = require("./passport-authenticator-setup");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

passport_stuff(app); // Initialize Passport.js before defining routes

const baseRouter = require("./routers/baseRouter");
app.use("/", baseRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));