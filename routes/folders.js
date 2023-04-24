const express = require('express');
const router = express.Router();
const { authToken } = require('../config/authtoken');
const { wrapper } = require('../config/wrapper');
const CtrFolders = require('../controllers/folders');

router.get("/list/:id_budget", [authToken], wrapper(CtrFolders.listFolders, "get list folders"));
router.get("/path/:id_folder", [authToken], wrapper(CtrFolders.getFolderPath, "get folders' budget name"));
router.get("/description/:id_folder", [authToken], wrapper(CtrFolders.getFolderDescription, "get folder description"));
router.get("/conditions/:id_folder", [authToken], wrapper(CtrFolders.getFolderConditions, "get folder conditions"));
router.get("/measurements/:id_folder", [authToken], wrapper(CtrFolders.getFolderMeasurements, "get folder measurement"));

router.post("/add", [authToken], wrapper(CtrFolders.addFolder, "add folder"));

router.put("/update/:id_folder", [authToken], wrapper(CtrFolders.updateFolder, "update folder"));
router.put("/measurements/:id_meas", [authToken], wrapper(CtrFolders.updateFolderMeasurement, "update folder measurement"));
router.get("/description/:id_folder", [authToken], wrapper(CtrFolders.updateFolderDescription, "update folder description"));

router.delete("/del/:id_folder", [authToken], wrapper(CtrFolders.deleteFolder, "delete folder"));

module.exports = router;