const express = require("express");
const userRouter = require("./users")
const router = express.Router;

router.use("/user", userRouter)

module.export = {
    router  
}
