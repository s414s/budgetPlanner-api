const express = require('express');
const router = express.Router();
const {authToken, authAdmin} = require('../config/authtoken');
const {wrapper} = require('../config/wrapper');
const CtrFolders = require('../controllers/folders');

router.get("/list/:id_budget", [authToken], wrapper(CtrFolders.listFolders, "get list folders"));
router.get("/description/:id_folder", [authToken], wrapper(CtrFolders.folderDescription, "get folder description"));
router.post("/add", [authToken], wrapper(CtrFolders.addFolder, "add folder"));
router.put("/update/:id_folder", [authToken], wrapper(CtrFolders.updateFolder, "update folder"));
router.delete("/del/:id_folder", [authToken], wrapper(CtrFolders.deleteFolder, "delete folder"));

module.exports = router;