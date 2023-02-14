const db = require('../config/DDBB');

module.exports.getUserRole = async (ID_user, ID_budget) => {
    const ID_u = parseInt(ID_user);
    const ID_b = parseInt(ID_budget);

    const result = await db("users_budgets")
        .select("role")
        .where("ID_user", ID_u)
        .where("ID_budget", ID_b);

    if (result[0]?.role) {
        return result[0].role
    } else {
        return false
    }
};

module.exports.changeLastModifiedDate = async (ID_budget) => {
    const ID_b = parseInt(ID_budget);

    return await db("budgets")
        .update({ last_modified: db.raw('CURRENT_TIMESTAMP') })
        .where('budgets.ID', ID_b)
};

module.exports.listBudgetByUser = async (ID_user) => {
    const ID_u = parseInt(ID_user);

    return await db("budgets")
        .leftJoin("users_budgets as user", "user.ID_budget", "budgets.ID")
        .select(["budgets.ID", "budgets.title", "budgets.description", "budgets.last_modified as lastUpdate", "user.role"])
        .where("user.ID_user", ID_u);
};

module.exports.getBudgetById = async (ID_user, ID_budget) => {
    const ID_u = parseInt(ID_user);
    const ID_b = parseInt(ID_budget);

    return await db("budgets")
        .leftJoin("users_budgets as user", "user.ID_budget", "budgets.ID")
        .select(["budgets.ID as budgetId", "budgets.title", "user.role"])
        .where("user.ID_user", ID_u)
        .andWhere("budgets.ID", ID_b);
};

module.exports.assignBudgetToUser = async (ID_user, ID_budget, role) => {
    const ID_u = parseInt(ID_user);
    const ID_b = parseInt(ID_budget);

    return await db("users_budgets").insert({
        ID_budget: ID_b,
        ID_user: ID_u,
        role: role
    });
};

module.exports.addBuget = async (title) => {

    return await db("budgets").insert({
        title: title
    });
};

module.exports.updateBudget = async (ID_budget, objInfoToUpdate) => {
    const ID_b = parseInt(ID_budget);

    return await db("budgets")
        .update(objInfoToUpdate)
        .where("ID", ID_b);
};

module.exports.deleteBudget = async (ID_budget) => {
    const ID_b = parseInt(ID_budget);

    await db("users_budgets")
        .where("ID_budget", ID_b)
        .delete();

    return await db("budgets")
        .where("ID", ID_b)
        .delete();

};

module.exports.recycleBudget = async (ID_budget) => {
    const ID_b = parseInt(ID_budget);

    await db("users_budgets")
        .whereIn("role", ["editor", "viewer"])
        .where("ID_budget", ID_b)
        .delete()

    return await db("users_budgets as user")
        .update({ role: "bin" })
        .where("role", "creator")
        .where("ID_budget", ID_b);
};

module.exports.recoverBudget = async (ID_budget) => {
    const ID_b = parseInt(ID_budget);

    return await db("users_budgets as user")
        .update({ role: "creator" })
        .where("role", "bin")
        .where("ID_budget", ID_b);
};

module.exports.emptyBin = async (ID_user) => {
    const ID_u = parseInt(ID_user);

    const files = await db("users_budgets as user")
        .select("ID_budget").pluck('ID_budget')
        .where("role", "bin")
        .where("ID_user", ID_u)

    await db("users_budgets")
        .whereIn("ID_budget", files)
        .delete()

    await db("budgets")
        .whereIn("ID", files)
        .delete()
};