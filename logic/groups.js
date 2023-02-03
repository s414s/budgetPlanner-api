const db = require('../config/DDBB');

module.exports.getUserRole = async (ID_user, ID_group) => {

    const result = await db("groups")
        .leftJoin("folders", "folders.ID", "groups.ID_folder")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .select(["user.role"])
        .where("groups.ID", ID_group)
        .where("user.ID_user", ID_user);

    if (result[0]?.role) {
        return result[0].role
    } else {
        return false
    }
}

module.exports.listGroupsByFolder = async (ID_user, ID_folder) => {

    return await db("groups")
    .select('groups.ID as id', 'groups.code', 'groups.amount', 'unit.name as unit', 'groups.name', db.raw('SUM(items.factor * prices.price) as totalPrice'))
    .leftJoin('folders', 'folders.ID', 'groups.ID_folder')
    .leftJoin('items', 'groups.ID', 'items.ID_groups')
    .leftJoin('prices', 'items.ID_price', 'prices.ID')
    .leftJoin('users_budgets as user', 'folders.ID_budget', 'user.ID_budget')
    .leftJoin('type_unit as unit', 'unit.ID', 'groups.ID_typeunit')
    .groupBy('groups.ID', 'user.ID_user', 'groups.code', 'groups.amount', 'unit.name', 'groups.name')
    .where('groups.ID_folder', ID_folder)
    .where('user.ID_user', ID_user);
}

module.exports.getGroupDescription = async (ID_user, ID_group) => {

    return await db("groups")
        .leftJoin("folders", "folders.ID", "groups.ID_folder")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .leftJoin("type_unit as unit", "unit.ID", "groups.ID_typeunit")
        .select(["groups.ID as id", "groups.description as info"])
        .where("groups.ID", ID_group)
        .where("user.ID_user", ID_user);
}

module.exports.addGroup = async (ID_folder, code, ID_typeunit, name) => {

    return await db("groups").insert({
        ID_folder,
        code,
        ID_typeunit,
        name
    });
}

module.exports.updateGroup = async (ID_group, objInfoToUpdate) => {

    return await db("groups")
        .update(objInfoToUpdate)
        .where("ID", ID_group);
}

module.exports.deleteGroup = async (ID_group) => {

    return await db("groups")
        .where("ID", ID_group)
        .delete();
}