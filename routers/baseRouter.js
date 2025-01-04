// routes/usersRouter.js
const { Router } = require("express");
const baseRouter = Router();
const baseController=require("../controllers/baseController")
const bcrypt = require("bcryptjs")

baseRouter.get("/test", (req, res)=>{
    res.render("test")
})

baseRouter.post("/newMsg", baseController.createMsgPOST)

module.exports = baseRouter;
