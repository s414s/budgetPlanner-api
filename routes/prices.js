const express = require('express');
const router = express.Router();
const {authToken, authAdmin} = require('../config/authtoken');
const {wrapper} = require('../config/wrapper');
const CtrPrices = require('../controllers/prices');

router.get("/list/:id_budget", [authToken], wrapper(CtrPrices.listPrices, "get list prices"))
router.get("/get/:id_price", [authToken], wrapper(CtrPrices.getPrice, "get price"))
router.post("/add", [authToken], wrapper(CtrPrices.addPrice, "add price"))
router.put("/update/:id_price", [authToken], wrapper(CtrPrices.updatePrice, "update price"))
router.delete("/del/:id_price", [authToken], wrapper(CtrPrices.deletePrice, "delete price"))

module.exports = router;