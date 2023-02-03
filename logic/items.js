const db = require('../config/DDBB');

module.exports.getUserRole = async (ID_user, ID_item) => {

    const result = await db("items")
        .leftJoin("groups", "items.ID", "items.ID_groups")
        .leftJoin("folders", "folders.ID", "groups.ID_folder")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .select(["user.role"])
        .where("items.ID", ID_item)
        .where("user.ID_user", ID_user);

        if (result[0]?.role) {
            return result[0].role
        } else {
            return false
        }
}

module.exports.listItems = async (ID_user, ID_group) => {

    return await db("items")
        .leftJoin("groups", "groups.ID", "items.ID_groups")
        .leftJoin("folders", "folders.ID", "groups.ID_folder")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .leftJoin("prices", "items.ID_price", "prices.ID")
        .leftJoin("type_unit as unit", "unit.ID", "prices.ID_typeunit")
        .select(["prices.code", "prices.price", "unit.name as unit", "prices.name", "items.factor as amount"])
        .where("items.ID_groups", ID_group)
        .where("user.ID_user", ID_user);
}

module.exports.addItem = async (ID_group, ID_price) => {

    return await db("items").insert({
        ID_group,
        ID_price
    });
}

module.exports.updateItem = async (ID_item, objInfoToUpdate) => {

    return await db("items")
        .update(objInfoToUpdate)
        .where("ID", ID_item);
}

module.exports.deleteItem = async (ID_item) => {

    return await db("items")
        .where("ID", ID_item)
        .delete();
}