const db = require('../config/DDBB');

module.exports.getUserRole = async (ID_user, ID_budget) => {

    const result = await db("users_budgets")
        .select("role")
        .where("ID_user", ID_user)
        .where("ID_budget", ID_budget);

    if (result[0]?.role) {
        return result[0].role
    } else {
        return false
    }
}

module.exports.listBudgetByUser = async (ID_user) => {

    return await db("budgets")
        .leftJoin("users_budgets as user", "user.ID_budget", "budgets.ID")
        .select(["budgets.ID", "budgets.title", "user.role"])
        .where("user.ID_user", ID_user);
}

module.exports.getBudgetById = async (ID_user, ID_budget) => {

    return await db("budgets")
        .leftJoin("users_budgets as user", "user.ID_budget", "budgets.ID")
        .select(["budgets.title", "user.role"])
        .where("user.ID_user", ID_user)
        .andWhere("budgets.ID", ID_budget);
}

module.exports.assignBudgetToUser = async (ID_user, ID_budget, role) => {

    try {
        return await db("users_budgets").insert({
            ID_budget,
            ID_user,
            role
        })
        //res.json({status:true, data: result[0]});
    } catch (error) {
        return false;
        //res.status(403).json({status:false, error:"error inesperado"});
    }
}

module.exports.addBuget = async (title) => {
    
    return await db("budgets").insert({
        title: title
    });
}

module.exports.deleteBudget = async (ID_budget) => {
    return await db("users_budgets")
        .where("ID_budget", ID_budget)
        .delete();
}

module.exports.updateBudget = async (ID_budget, objInfoToUpdate) => {
    return await db("budgets")
        .update(objInfoToUpdate)
        .where("ID", ID_budget);
}
