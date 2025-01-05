// routes/usersRouter.js
const { Router } = require("express");
const baseRouter = Router();
const baseController = require("../controllers/baseController");

baseRouter.get("/test", (req, res) => {
  res.render("test");
});

baseRouter.post("/newMsg", baseController.createMsgPOST);

baseRouter.get("/admin/:user", baseController.GETAdminForm);
baseRouter.post("/admin", baseController.POSTAdminForm);

baseRouter.get("/delete/:id", baseController.deleteMsgById);

module.exports = baseRouter;
