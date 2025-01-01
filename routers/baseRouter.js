// routes/usersRouter.js
const { Router } = require("express");
const baseController = require("../controllers/baseController");
const baseRouter = Router();
const bcrypt = require("bcryptjs")

baseRouter.get("/test", (req, res)=>{
    res.render("test")
})

baseRouter.get("/login", )
module.exports = baseRouter;
