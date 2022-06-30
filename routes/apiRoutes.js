const express = require("express");

var router = express.Router();

const {apiGetCurrentVehicles} = require('../apiGetCurrentVehicles');
const {apiGetVehicleData} = require('../apiGetVehicleData');
const {apiPostVehicleData} = require('../apiPostVehicleData');


router.get("/apiGetCurrentVehicles", apiGetCurrentVehicles)

router.post('/postVehicleData', apiPostVehicleData)
router.get('/getVehicleData', apiGetVehicleData)

module.exports = router;