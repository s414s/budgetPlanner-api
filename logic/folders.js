const db = require('../config/DDBB');

module.exports.getUserRole = async (ID_user, ID_folder) => {
    const ID_u = parseInt(ID_user);
    const ID_f = parseInt(ID_folder);

    const result = await db("folders")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .select(["user.role"])
        .where("folders.ID", ID_f)
        .where("user.ID_user", ID_u);

    if (result[0]?.role) {
        return result[0].role
    } else {
        return false
    }
};

module.exports.getMeasurementUserRole = async (ID_user, ID_meas) => {
    const ID_u = parseInt(ID_user);
    const ID_m = parseInt(ID_meas);

    const result = await db("folders")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .leftJoin("folders_measurements as meas", "folders.ID", "meas.ID_folder")
        .select(["user.role"])
        .where("meas.ID", ID_m)
        .where("user.ID_user", ID_u);

    if (result[0]?.role) {
        return result[0].role
    } else {
        return false
    }
};

module.exports.getFolderPath = async (ID_user, ID_folder) => {
    const ID_u = parseInt(ID_user);
    const ID_f = parseInt(ID_folder);

    const result = await db("users_budgets as user")
        .leftJoin("folders", "folders.ID_budget", "user.ID_budget")
        .leftJoin("budgets", "budgets.ID", "user.ID_budget")
        .select(["budgets.ID as budgetId", "budgets.title as budgetTitle", "folders.ID as folderId", "folders.name as folderName", "user.role as role"])
        .where("folders.ID", ID_f)
        .where("user.ID_user", ID_u);

    if (!result.length) {
        return 'No Budget Found'
    } else {
        return result[0]
    }
};

module.exports.getListFolders = async (ID_user, ID_budget) => {
    const ID_u = parseInt(ID_user);
    const ID_b = parseInt(ID_budget);

    return await db("folders")
        .select('folders.ID as id', 'folders.code', 'folders.name', db.raw('SUM(groups.amount * items.factor * prices.price) as totalPrice'))
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .leftJoin('groups', 'folders.ID', 'groups.ID_folder')
        .leftJoin('items', 'groups.ID', 'items.ID_groups')
        .leftJoin('prices', 'items.ID_price', 'prices.ID')
        .groupBy('folders.ID', 'folders.code', 'folders.name')
        .where('user.ID_budget', ID_b)
        .where("user.ID_user", ID_u);
};

module.exports.getFolderDescription = async (ID_user, ID_folder) => {
    const ID_u = parseInt(ID_user);
    const ID_f = parseInt(ID_folder);

    return await db("folders")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .leftJoin("foldersDescription as description", "description.ID_folder", "folders.ID")
        .select(["folders.ID as id", "description.description as info"])
        .where("folders.ID", ID_f)
        .where("user.ID_user", ID_u);
};

module.exports.getFolderConditions = async (ID_user, ID_folder) => {
    const ID_u = parseInt(ID_user);
    const ID_f = parseInt(ID_folder);

    return await db("folders")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .leftJoin("folders_conditions as conditions", "conditions.ID_folder", "folders.ID")
        .select(["folders.ID as id", "conditions.description as info"])
        .where("folders.ID", ID_f)
        .where("user.ID_user", ID_u);
};

module.exports.getFolderMeasurements = async (ID_user, ID_folder) => {
    const ID_u = parseInt(ID_user);
    const ID_f = parseInt(ID_folder);

    return await db("folders")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .leftJoin("folders_measurements as measurements", "measurements.ID_folder", "folders.ID")
        .select(["measurements.ID as id", "measurements.quantity as quantity", "measurements.length as length","measurements.width as width","measurements.height as height", "measurements.total as total", "measurements.description as comment", "measurements.formula as formula"])
        .where("folders.ID", ID_f)
        .where("user.ID_user", ID_u);
};

module.exports.updateFolderMeasurement = async (ID_meas, objInfoToUpdate) => {
    const ID_m = parseInt(ID_meas);
    console.log(objInfoToUpdate)

    return await db("folders_measurements")
        .update(objInfoToUpdate)
        .where("ID", ID_m);
};

module.exports.addFolder = async (ID_budget, code, name) => {
    const ID_b = parseInt(ID_budget);

    return await db("folders").insert({
        ID_budget: ID_b,
        code,
        name
    });
};

module.exports.updateFolder = async (ID_folder, objInfoToUpdate) => {
    const ID_f = parseInt(ID_folder);

    return await db("folders")
        .update(objInfoToUpdate)
        .where("ID", ID_f);
};

module.exports.deleteFolder = async (ID_folder) => {
    const ID_f = parseInt(ID_folder);

    return await db("folders")
        .where("ID", ID_f)
        .delete();
};