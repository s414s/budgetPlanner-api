const db = require('../config/DDBB');

module.exports.getUserRole = async (ID_user, ID_item) => {
    const ID_u = parseInt(ID_user);
    const ID_i = parseInt(ID_item);

    const result = await db("items")
        .leftJoin("groups", "groups.ID", "items.ID_groups")
        .leftJoin("folders", "folders.ID", "groups.ID_folder")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .select(["user.role"])
        .where("items.ID", ID_i)
        .where("user.ID_user", ID_u);

        if (result[0]?.role) {
            return result[0].role
        } else {
            return false
        }
};

module.exports.listAllItems = async (ID_user, ID_budget) => {
    const ID_u = parseInt(ID_user);
    const ID_b = parseInt(ID_budget);

    return await db("items")
        .leftJoin("groups", "groups.ID", "items.ID_groups")
        .leftJoin("folders", "folders.ID", "groups.ID_folder")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .leftJoin("prices", "items.ID_price", "prices.ID")
        .leftJoin("type_unit as unit", "unit.ID", "prices.ID_typeunit")
        .select(["items.ID", "prices.price", "unit.name as unit", "prices.name", "items.factor as amount"])
        .where("user.ID_budget", ID_b)
        .where("user.ID_user", ID_u);
};

module.exports.listItems = async (ID_user, ID_group) => {
    const ID_u = parseInt(ID_user);
    const ID_g = parseInt(ID_group);

    return await db("items")
        .leftJoin("groups", "groups.ID", "items.ID_groups")
        .leftJoin("folders", "folders.ID", "groups.ID_folder")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .leftJoin("prices", "items.ID_price", "prices.ID")
        .leftJoin("type_unit as unit", "unit.ID", "prices.ID_typeunit")
        .select(["items.ID as id", "prices.code", "prices.price", "unit.name as unit", "prices.name", "items.factor as amount"])
        .where("items.ID_groups", ID_g)
        .where("user.ID_user", ID_u);
};

module.exports.addItem = async (ID_group, ID_price) => {
    const ID_g = parseInt(ID_group);
    const ID_p = parseInt(ID_price);

    return await db("items").insert({
        ID_groups: ID_g,
        ID_price: ID_p
    });
};

module.exports.updateItem = async (ID_item, objInfoToUpdate) => {
    const ID_i = parseInt(ID_item);

    return await db("items")
        .update(objInfoToUpdate)
        .where("ID", ID_i);
};

module.exports.deleteItem = async (ID_item) => {
    const ID_i = parseInt(ID_item);

    return await db("items")
        .where("ID", ID_i)
        .delete();
};