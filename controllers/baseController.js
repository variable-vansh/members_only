const bcrypt = require("bcryptjs");
const pool = require('../db/pool'); // Import your pool from your database setup file
const { body, validationResult } = require("express-validator");

const validateUser = [
  body("firstName").trim()
    .isAlpha().withMessage("First name must contain only letters"),  
  body("lastName").trim()
    .isAlpha().withMessage("Last name must contain only letters"),  
  body('confirmPassword').trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

exports.createUserPOST=[
    validateUser,
    async (req, res, next)=>{
        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                     return res.status(400).render("sign-up-form", {
                    errors: errors.array(),
                    });
                }
            const { firstName, lastName, username, password, membershipStatus } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            await pool.query("INSERT INTO users (firstName, lastName, username, password, membershipStatus) VALUES ($1, $2, $3, $4, $5)", [
                firstName,
                lastName,
                username,
                hashedPassword,
                "yes"
            ]);
            res.redirect("/");
        } catch(err) {
            console.error(err);
            next(err);
        }
    }]