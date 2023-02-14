const db = require('../config/DDBB');

module.exports.getUserRole = async (ID_user, ID_group) => {
    const ID_u = parseInt(ID_user);
    const ID_g = parseInt(ID_group);

    const result = await db("groups")
        .leftJoin("folders", "folders.ID", "groups.ID_folder")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .select(["user.role"])
        .where("groups.ID", ID_g)
        .where("user.ID_user", ID_u);

    if (result[0]?.role) {
        return result[0].role
    } else {
        return false
    }
};

module.exports.getGroupPath = async (ID_user, ID_group) => {
    const ID_u = parseInt(ID_user);
    const ID_g = parseInt(ID_group);

    const result = await db("users_budgets as user")
        .leftJoin("folders", "folders.ID_budget", "user.ID_budget")
        .leftJoin("groups", "folders.ID", "groups.ID_folder")
        .leftJoin("budgets", "budgets.ID", "user.ID_budget")
        .select(["budgets.ID as budgetId", "budgets.title as budgetTitle", "folders.ID as folderId", "folders.name as folderName", "groups.ID as groupId", "groups.name as groupName", "user.role as role"])
        .where("groups.ID", ID_g)
        .where("user.ID_user", ID_u);
    
    if (!result.length) {
        return 'No Budget Found'
    } else {
        return result[0]
    }
};

module.exports.listGroupsByFolder = async (ID_user, ID_folder) => {
    const ID_u = parseInt(ID_user);
    const ID_f = parseInt(ID_folder);

    return await db("groups")
        .select('groups.ID as id', 'groups.code', 'groups.amount', 'unit.name as unit', 'groups.name', db.raw('SUM(items.factor * prices.price) as totalPrice'))
        .leftJoin('folders', 'folders.ID', 'groups.ID_folder')
        .leftJoin('items', 'groups.ID', 'items.ID_groups')
        .leftJoin('prices', 'items.ID_price', 'prices.ID')
        .leftJoin('users_budgets as user', 'folders.ID_budget', 'user.ID_budget')
        .leftJoin('type_unit as unit', 'unit.ID', 'groups.ID_typeunit')
        .groupBy('groups.ID', 'user.ID_user', 'groups.code', 'groups.amount', 'unit.name', 'groups.name')
        .where('groups.ID_folder', ID_f)
        .where('user.ID_user', ID_u);
};

module.exports.getGroupDescription = async (ID_user, ID_group) => {
    const ID_u = parseInt(ID_user);
    const ID_g = parseInt(ID_group);

    return await db("groups")
        .leftJoin("folders", "folders.ID", "groups.ID_folder")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .leftJoin("type_unit as unit", "unit.ID", "groups.ID_typeunit")
        .select(["groups.ID as id", "groups.description as info"])
        .where("groups.ID", ID_g)
        .where("user.ID_user", ID_u);
};

module.exports.getGroupConditions = async (ID_user, ID_group) => {
    const ID_u = parseInt(ID_user);
    const ID_g = parseInt(ID_group);

    return await db("groups")
        .leftJoin("folders", "folders.ID", "groups.ID_folder")
        .leftJoin("groups_conditions as conditions", "groups.ID", "conditions.ID_group")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .select(["groups.ID as id", "conditions.description as info"])
        .where("groups.ID", ID_g)
        .where("user.ID_user", ID_u);
};

module.exports.addGroup = async (ID_folder, code, ID_typeunit, name) => {
    const ID_f = parseInt(ID_folder);

    return await db("groups").insert({
        ID_folder: ID_f,
        code,
        ID_typeunit,
        name
    });
};

module.exports.updateGroup = async (ID_group, objInfoToUpdate) => {
    const ID_g = parseInt(ID_group);

    return await db("groups")
        .update(objInfoToUpdate)
        .where("ID", ID_g);
};

module.exports.deleteGroup = async (ID_group) => {
    const ID_g = parseInt(ID_group);

    return await db("groups")
        .where("ID", ID_g)
        .delete();
};