const BudgetLogic = require('../logic/budgets');

module.exports.listBudget = async (req, res) => {
    const ID_user = req.user.ID;

    const result = await BudgetLogic.listBudgetByUser(ID_user);
    res.status(200).json({ status: true, data: result });
};

module.exports.getBudgetById = async (req, res) => {
    const ID_budget = parseInt(req.params.id_budget);
    const ID_user = req.user.ID;

    if (!ID_budget) {
        throw { type: "custom", message: "missing data, add budget ID" }
    };

    const budget = await BudgetLogic.getBudgetById(ID_user, ID_budget);

    if (budget.length > 0) {
        res.status(200).json({ status: true, data: budget[0] });
    } else {
        throw { type: "custom", message: "no data found" }
    }
};

module.exports.assignBudgetToUser = async (req, res) => {
    const required = ["ID_budget", "ID_user", "role"];
    const ID_user = req.user.ID;

    // Check for missing info
    const keysBody = Object.keys(req.body);
    let field = true;

    required.forEach(e => { if (!keysBody.includes(e)) { field = e; } })

    if (field !== true) {
        throw { type: "custom", message: `missing data, add ${field}` };
    };

    const userRole = await BudgetLogic.getUserRole(ID_user, ID_budget);
    if (userRole !== "creator") {
        throw { type: "custom", message: "not allowed" };
    };

    const result = await BudgetLogic.assignBudgetToUser(req.body.ID_user, req.body.ID_budget, req.body.role);

    if (!result) {
        throw { type: "custom", message: "unexpected error" };
    };

    res.json({ status: true, data: result[0] });
};

module.exports.addBudget = async (req, res) => {
    const ID_user = req.user.ID;
    const required = ["title"];

    const keysBody = Object.keys(req.body);
    let field = true;

    required.forEach(e => { if (!keysBody.includes(e)) { field = e } });

    if (field !== true) {
        throw { type: "custom", message: `missing data, add ${field}` };
    };

    const result = await BudgetLogic.addBuget(req.body.title);

    if (result.length > 0) {
        await BudgetLogic.assignBudgetToUser(ID_user, result[0], "creator")
    } else {
        throw { type: "custom", message: "budget not created" };
    };

    res.json({ status: true });
};

module.exports.updateBudget = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_budget = parseInt(req.params.id_budget);

    // check editable fields
    const allow = ["title"];
    let to_update = {};
    const keysBody = Object.keys(req.body);

    allow.forEach(e => {
        if (keysBody.includes(e)) {
            to_update[e] = req.body[e];
        }
    });

    if (Object.keys(keysBody).length === 0) {
        throw { type: "custom", message: "send elements to update" };
    };

    const userRole = await BudgetLogic.getUserRole(ID_user, ID_budget);
    if (!["creator", "editor"].includes(userRole)) {
        throw { type: "custom", message: "not allowed" };
    };

    await BudgetLogic.updateBudget(ID_budget, to_update);
    await BudgetLogic.changeLastModifiedDate(ID_budget);

    res.json({ status: true });
};

module.exports.deleteBudget = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_budget = parseInt(req.params.id_budget);

    const userRole = await BudgetLogic.getUserRole(ID_user, ID_budget);
    if (userRole !== "bin") {
        throw { type: "custom", message: "not allowed" };
    };

    await BudgetLogic.deleteBudget(ID_budget);
    res.json({ status: true });
};

module.exports.recycleBudget = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_budget = parseInt(req.params.id_budget);

    const userRole = await BudgetLogic.getUserRole(ID_user, ID_budget);
    if (userRole !== "creator") {
        throw { type: "custom", message: "not allowed" };
    };

    await BudgetLogic.recycleBudget(ID_budget);
    res.json({ status: true });
};

module.exports.recoverBudget = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_budget = parseInt(req.params.id_budget);

    const userRole = await BudgetLogic.getUserRole(ID_user, ID_budget);
    if (userRole !== "bin") {
        throw { type: "custom", message: "not allowed" };
    };

    await BudgetLogic.recoverBudget(ID_budget);
    res.json({ status: true });
};

module.exports.emptyBin = async (req, res) => {
    const ID_user = req.user.ID;

    await BudgetLogic.emptyBin(ID_user);
    res.json({ status: true });
};