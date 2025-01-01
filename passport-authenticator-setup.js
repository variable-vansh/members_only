const express = require('express');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const pool = require('./db/pool'); // Import your pool from your database setup file

function passport_stuff(app){
    app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
    app.use(passport.session());
    app.use(express.urlencoded({ extended: false })); 
    app.use((req, res, next) => {
        res.locals.currentUser = req.user;
        next();
    });


    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
                const user = rows[0];

                if (!user) {
                    return done(null, false, { message: "Incorrect username" });
                }
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    // passwords do not match!
                    return done(null, false, { message: "Incorrect password" })
                }
                return done(null, user);
            } catch(err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
            const user = rows[0];

            done(null, user);
        } catch(err) {
            console.error(err);
            done(err);
        }
    });

    app.post(
        "/log-in",
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/"
        })
    );

    app.get("/log-out", (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    });

    app.get("/", (req, res) => {
        res.render("index", { user: req.user });
    });
    app.get("/sign-up", (req, res) => res.render("sign-up-form"));

    app.post("/sign-up", async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
                username,
                hashedPassword,
            ]);
            res.redirect("/");
        } catch(err) {
            console.error(err);
            next(err);
        }
    });
}

module.exports = passport_stuff;