const db = require('../config/DDBB');

module.exports.getUserRole = async (ID_user) => {

    const result = await db("users")
    .select(["users.role"])
    .where("users.ID", ID_user);

    if (result[0]?.role) {
        return result[0].role
    } else {
        return false
    }
}

module.exports.getUsersList = async () => {

    return await db
        .select(["ID", "name", "email", "password", "token"])
        .from("users")
}

module.exports.addUser = async (name, email, password, token) => {

    try {
        return await db("users").insert({
            name,
            email,
            password,
            token
        });

    } catch (error) {
        //res.status(403).json({status:false, error:"unexpected error"});
        throw "unexpected error"
    }
}

module.exports.getUser = async (email, password) => {

    try {
        return await db
            .select("token")
            .from("users")
            .where("email", email)
            .where("password", password);
            
    } catch (error) {
        //res.status(403).json({status:false, error:"unexpected error"});
        throw "unexpected error"
    }
}

module.exports.updateUser = async (ID_user, objInfoToUpdate) => {
    const ID = parseInt(ID_user);
    if (typeof objInfoToUpdate !== "object") {
        return false
    }

    return await db("users")
        .update(objInfoToUpdate)
        .where("ID", ID_user);
}

module.exports.deleteUser = async (ID_user) => {

    try {
        return await db("users")
            .where("ID", ID_user)
            .delete();
            
    } catch (error) {
        //res.status(403).json({status:false, error:"unexpected error"});
        throw "unexpected error"
    }
}