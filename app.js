const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

var dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3002

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

var routeConfig = require('./routeConfig/route-config')
app.use('/api',routeConfig)
app.listen(PORT, () => {
  console.log("Server running " +PORT)  
});