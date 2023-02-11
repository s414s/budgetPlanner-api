const db = require('../config/DDBB');

module.exports.getUserRole = async (ID_user) => {
    const ID = parseInt(ID_user);

    const result = await db("users")
        .select(["users.role"])
        .where("users.ID", ID);

    if (result[0]?.role) {
        return result[0].role
    } else {
        return false
    }
};

module.exports.getUsersList = async () => {

    return await db
        .select(["ID", "name", "email", "password", "token"])
        .from("users")
};

module.exports.addUser = async (name, email, password, token) => {

    return await db("users").insert({
        name,
        email,
        password,
        token
    });
};

module.exports.getUser = async (email, password) => {

    try {
        return await db
            .select("token")
            .from("users")
            .where("email", email)
            .where("password", password);

    } catch (error) {
        throw "unexpected error"
    }
};

module.exports.updateUser = async (ID_user, objInfoToUpdate) => {
    const ID = parseInt(ID_user);

    if (typeof objInfoToUpdate !== "object") {
        return false
    };

    return await db("users")
        .update(objInfoToUpdate)
        .where("ID", ID);
};

module.exports.deleteUser = async (ID_user) => {
    const ID = parseInt(ID_user);

    return await db("users")
        .where("ID", ID)
        .delete();
};