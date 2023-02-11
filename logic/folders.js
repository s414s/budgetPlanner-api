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

module.exports.listFolders = async (ID_user, ID_budget) => {
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