const express = require("express");
var router = express.Router();

const api_routes = require('../routes/apiRoutes')

router.use('/', api_routes);

module.exports = router;