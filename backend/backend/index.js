import path from "path";
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");

const __dirname = path.resolve();

app.use("/api/v1", mainRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")))\
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})


app.listen(3000);