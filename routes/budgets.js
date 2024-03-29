const express = require('express');
const router = express.Router();
const {authToken} = require('../config/authtoken');
const {wrapper} = require('../config/wrapper');
const CtrBudgets = require('../controllers/budgets');

router.get("/list/", [authToken], wrapper(CtrBudgets.listBudget, "budget list"));
router.get("/get/:id_budget", [authToken], wrapper(CtrBudgets.getBudgetById, "get budget"));

router.post("/assign", [authToken], wrapper(CtrBudgets.assignBudgetToUser, "assign budget"));
router.post("/add", [authToken], wrapper(CtrBudgets.addBudget, "add budget"));

router.put("/update/:id_budget", [authToken], wrapper(CtrBudgets.updateBudget, "update budget"));

router.delete("/del/:id_budget", [authToken], wrapper(CtrBudgets.deleteBudget, "delete budget"));
router.delete("/recycle/:id_budget", [authToken], wrapper(CtrBudgets.recycleBudget, "recycle budget"));
router.delete("/recover/:id_budget", [authToken], wrapper(CtrBudgets.recoverBudget, "recover budget"));
router.delete("/emptybin", [authToken], wrapper(CtrBudgets.emptyBin, "empty bin"));
router.delete("/recoverbin", [authToken], wrapper(CtrBudgets.recoverAllBudgets, "recover bin"));

module.exports = router;