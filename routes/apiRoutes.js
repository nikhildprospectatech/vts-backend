const express = require("express");

var router = express.Router();

const {apiGetCurrentVehicles} = require('../apiGetCurrentVehicles');
const { getUser } = require("../apiGetUser");
const {apiGetVehicleData} = require('../apiGetVehicleData');
const {apiPostVehicleData} = require('../apiPostVehicleData');
const { apiRegUserdata } = require('../apiRegUser');
const { login } = require("../login");
const { verifyToken } = require('../middleware/auth')

router.get("/apiGetCurrentVehicles", apiGetCurrentVehicles);

router.post('/postVehicleData', apiPostVehicleData);
router.get('/getVehicleData', apiGetVehicleData);

router.post('/apiRegUserdata', apiRegUserdata);

router.post('/login', login);

router.get('/getUser', getUser)

module.exports = router;