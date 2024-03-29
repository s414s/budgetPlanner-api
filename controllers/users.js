const UsersLogic = require('../logic/users');
var crypto = require('crypto');
const Helpers = require('../helpers/helpers');

module.exports.listUsers = async (req, res) => {
    const users = await UsersLogic.getUsersList();
    res.status(200).json({status:true, data: users});
};

module.exports.getMyUser = async (req, res) => {
    return res.status(200).json({status:true, data: req.user});
};

module.exports.addUser = async (req, res) => {
    const required = ["name", "email", "password"];

    Helpers.checkRequiredFields(required, req.body);

    // Create password and token SHA1
    const password = crypto.createHash('sha1').update(req.body.password).digest('hex');
    const token = crypto.createHash('sha1').update(req.body.password+req.body.user).digest('hex');

    const result = await UsersLogic.addUser(req.body.name, req.body.email, password, token);
    res.status(200).json({status:true, data: result[0]});
};

module.exports.login = async (req, res) => {
    const required = ["email", "password"];

    Helpers.checkRequiredFields(required, req.body);

    // Create password and token SHA1
    const password = crypto.createHash('sha1').update(req.body.password).digest('hex');
    const user = await UsersLogic.getUser(req.body.email, password);

    if(user.length === 1){
        return res.json({status:true, data: user[0]});
    } else {
        throw { type: "custom", message: "user or password are incorrect" };
    }
};

module.exports.updateUser = async (req, res) => {
    const ID_user = req.user.ID;
    const allow = ["name", "email", "password"];

    const to_update = Helpers.getObjectToUpdate(allow, req.body)

    await UsersLogic.updateUser(ID_user, to_update);
    res.status(200).json({status:true});
};

module.exports.deleteUser = async (req, res) => {
    const ID_user = req.user.ID;

    await UsersLogic.deleteUser(ID_user);
    res.status(200).json({status:true});
};