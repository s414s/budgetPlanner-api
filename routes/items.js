const express = require('express');
const router = express.Router();
const {authToken, authAdmin} = require('../config/authtoken');
const {wrapper} = require('../config/wrapper');
const CtrItems = require('../controllers/items');

router.get("/list/:id_group", [authToken], wrapper(CtrItems.listItems, "get list items"))
router.post("/add", [authToken], wrapper(CtrItems.addItem, "add item"))
router.put("/update/:id_item", [authToken], wrapper(CtrItems.updateItem, "update item"))
router.delete("/del/:id_item", [authToken], wrapper(CtrItems.deleteItem, "delete item"))

module.exports = router;