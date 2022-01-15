const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

//Controllers
const albumController = require("./controllers/album.controller")
const userController = require("./controllers/user.controller");


app.use("/album", albumController);
app.use("/", userController);



module.exports = app;