const { body, validationResult } = require("express-validator");

const validateUser = [
  body("firstName").trim()
    .isAlpha().withMessage("First name must contain only letters"),  
  body("lastName").trim()
    .isAlpha().withMessage("Last name must contain only letters"),  
  body("email").trim()
    .isEmail().withMessage("Invalid email format"),
];

module.exports=validateUser;