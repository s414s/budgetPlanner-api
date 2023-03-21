const express = require('express');
const router = express.Router();
const { authToken } = require('../config/authtoken');
const { wrapper } = require('../config/wrapper');
const CtrGroups = require('../controllers/groups');

router.get("/list/:id_folder", [authToken], wrapper(CtrGroups.listGroups, "get list groups"))
router.get("/path/:id_group", [authToken], wrapper(CtrGroups.getGroupPath, "get list groups"))
router.get("/description/:id_group", [authToken], wrapper(CtrGroups.getGroupDescription, "get group description"))
router.get("/conditions/:id_group", [authToken], wrapper(CtrGroups.getGroupConditions, "get group conditions"))

router.post("/add", [authToken], wrapper(CtrGroups.addGroup, "add group"))

router.put("/update/:id_group", [authToken], wrapper(CtrGroups.updateGroup, "update group"))

router.delete("/del/:id_group", [authToken], wrapper(CtrGroups.deleteGroup, "delete group"))

module.exports = router;