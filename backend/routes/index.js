const express = require("express");
const userRouter = require("./users")
const router = express.Router;

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.export = {
    router  
}
