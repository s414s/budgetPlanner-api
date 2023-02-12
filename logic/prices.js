const db = require('../config/DDBB');

module.exports.getUserRole = async (ID_user, ID_price) => {
    const ID_u = parseInt(ID_user);
    const ID_p = parseInt(ID_price);

    const result = await db("prices")
        .leftJoin("items", "prices.ID", "items.ID_price")
        .leftJoin("groups", "groups.ID", "items.ID_groups")
        .leftJoin("folders", "folders.ID", "groups.ID_folder")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .leftJoin("prices", "items.ID_price", "prices.ID")
        .select(["user.role"])
        .where("prices.ID", ID_p)
        .where("user.ID_user", ID_u);

        if (result[0]?.role) {
            return result[0].role
        } else {
            return false
        }
};

module.exports.listPrices = async (ID_user, ID_budget) => {
    const ID_u = parseInt(ID_user);
    const ID_b = parseInt(ID_budget);

    return await db("prices")
        .leftJoin("items", "prices.ID", "items.ID_price")
        .leftJoin("groups", "groups.ID", "items.ID_groups")
        .leftJoin("folders", "folders.ID", "groups.ID_folder")
        .leftJoin("users_budgets as user", "folders.ID_budget", "user.ID_budget")
        .select(["prices.ID", "prices.code", "prices.name", "prices.price"])
        .where("user.ID_budget", ID_b)
        .where("user.ID_user", ID_u);
};

module.exports.getPrice = async (ID_price) => {
    const ID_p = parseInt(ID_price);

    return await db
        .select(["code", "name", "price"])
        .from("prices")
        .where("ID", ID_p);
};

module.exports.addPrice = async (code, ID_typeunit, name, price) => {

    return await db("prices").insert({
        code,
        ID_typeunit,
        name,
        price
    })
};

module.exports.updatePrice = async (ID_price, objInfoToUpdate) => {
    const ID_p = parseInt(ID_price);

    return await db("prices")
        .update(objInfoToUpdate)
        .where("ID", ID_p);
};

module.exports.deletePrice = async (ID_price) => {
    const ID_p = parseInt(ID_price);

    return await db("prices")
        .where("ID", ID_p)
        .delete();
};