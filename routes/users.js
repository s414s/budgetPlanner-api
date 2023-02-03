const express = require('express');
const router = express.Router();
const {authToken, authAdmin} = require('../config/authtoken');
const {wrapper} = require('../config/wrapper');
const CtrUsers = require('../controllers/users');

router.get("/list", [authToken, authAdmin], wrapper(CtrUsers.listUsers, "get list users"));
router.get("/get/me", [authToken], wrapper(CtrUsers.getMyUser, "get my user"));
router.post("/add", wrapper(CtrUsers.addUser, "add user"));
router.post("/login", wrapper(CtrUsers.login, "login user"));
router.put("/update", [authToken], wrapper(CtrUsers.updateUser, "update user"));
router.delete("/del", [authToken], wrapper(CtrUsers.deleteUser, "delete user"));

module.exports = router;