const express = require('express');
const router = express.Router();
const {authToken} = require('../config/authtoken');
const {wrapper} = require('../config/wrapper');
const CtrPrices = require('../controllers/prices');

router.post("/add", [authToken], wrapper(CtrPrices.addPrice, "add price"))
router.put("/update/:id_price", [authToken], wrapper(CtrPrices.updatePrice, "update price"))
router.delete("/del/:id_price", [authToken], wrapper(CtrPrices.deletePrice, "delete price"))

module.exports = router;