const express = require("express");

var router = express.Router();

const {apiGetCurrentVehicles} = require('../apiGetCurrentVehicles');
const { getUser } = require("../apiGetUser");
const {apiGetVehicleData} = require('../apiGetVehicleData');
const {apiPostVehicleData} = require('../apiPostVehicleData');
const { apiRegUserdata } = require('../apiRegUser');
const { forgotPass } = require("../forgotPass");
const { login } = require("../login");
const { verifyToken } = require('../middleware/auth');
const { resetPass } = require("../resetPassword");

router.get("/apiGetCurrentVehicles", apiGetCurrentVehicles);

router.post('/postVehicleData', apiPostVehicleData);
router.get('/getVehicleData', apiGetVehicleData);

router.post('/apiRegUserdata', apiRegUserdata);

router.get('/login', login);

router.get('/getUser', getUser)

router.post('/forgotPass', forgotPass)

router.post('/passwordReset', resetPass)

module.exports = router;