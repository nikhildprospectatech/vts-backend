const express = require("express");

var router = express.Router();

const {apiGetCurrentVehicles} = require('../apiGetCurrentVehicles');
const {apiGetVehicleData} = require('../apiGetVehicleData');
const {apiPostVehicleData} = require('../apiPostVehicleData');
const { apiRegUserdata } = require('../apiRegUser');
const { login } = require("../login");
const { verifyToken } = require('../middleware/auth')

router.get("/apiGetCurrentVehicles", apiGetCurrentVehicles);

router.post('/postVehicleData',verifyToken, apiPostVehicleData);
router.get('/getVehicleData', verifyToken, apiGetVehicleData);

router.post('/apiRegUserdata', apiRegUserdata);

router.post('/login', login);

module.exports = router;