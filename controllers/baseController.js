const bcrypt = require("bcryptjs");
const pool = require("../db/pool"); // Import your pool from your database setup file
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage("First name must contain only letters"),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage("Last name must contain only letters"),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

exports.createUserPOST = [
  validateUser,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("sign-up-form", {
          errors: errors.array(),
        });
      }
      const { firstName, lastName, username, password, membershipStatus } =
        req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        "INSERT INTO users (firstName, lastName, username, password, membershipStatus) VALUES ($1, $2, $3, $4, $5)",
        [firstName, lastName, username, hashedPassword, "yes"]
      );
      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

exports.createMsgPOST = async (req, res) => {
  const { message, posterUsername } = req.body;
  // console.log(message, posterUsername)
  await pool.query(
    "INSERT INTO messages (username, message, time) VALUES ($1, $2, $3)",
    [posterUsername, message, new Date()]
  );

  const allMsgs = await db.getAllMessagesMember();
  res.render("messageBoard", { user: req.user, messages: allMsgs });
};

exports.GETAdminForm = (req, res) => {
  // console.log(req.params)
  res.render("adminForm", { username: req.params.user });
};

exports.POSTAdminForm = async (req, res) => {
  const { code, username } = req.body;
  if (code == "911") {
    console.log(username);

    await pool.query("UPDATE users SET admin=$1 where username=$2", [
      true,
      username,
    ]);
    res.redirect("/");
  } else {
    res.redirect("/");
  }
};

exports.deleteMsgById = async (req, res) => {
  var id = req.params.id;
  db.deleteMessageById(id);
  res.redirect("/");
};
