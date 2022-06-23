const express = require("express");

var router = express.Router();

const {apiGetData} = require('../apiGetData');
const {apiPostData} = require('../apiPostData');
const {apiGetVehicleData} = require('../apiGetVehicleData');
const {apiPostVehicleData} = require('../apiPostVehicleData');

router.post('/postSample',apiPostData)
router.get("/getData", apiGetData)

router.post('/postVehicleData', apiPostVehicleData)
router.get('/getVehicleData', apiGetVehicleData)

module.exports = router;