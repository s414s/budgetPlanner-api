const express = require('express');
const router = express.Router();
const {authToken, authAdmin} = require('../config/authtoken');
const {wrapper} = require('../config/wrapper');
const CtrGroups = require('../controllers/groups');

router.get("/list/:id_folder", [authToken], wrapper(CtrGroups.listGroups, "get list groups"))
router.get("/description/:id_group", [authToken], wrapper(CtrGroups.groupDescription, "get group description"))
router.post("/add", [authToken], wrapper(CtrGroups.addGroup, "add group"))
router.put("/update/:id_group", [authToken], wrapper(CtrGroups.updateGroup, "update group"))
router.delete("/del/:id_group", [authToken], wrapper(CtrGroups.deleteGroup, "delete group"))

module.exports = router;