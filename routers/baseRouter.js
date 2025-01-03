// routes/usersRouter.js
const { Router } = require("express");
const baseRouter = Router();
const bcrypt = require("bcryptjs")

baseRouter.get("/test", (req, res)=>{
    res.render("test")
})

module.exports = baseRouter;
