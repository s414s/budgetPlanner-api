const BudgetLogic = require('../logic/budgets');
const FoldersLogic = require('../logic/folders');
const Helpers = require('../helpers/helpers');

module.exports.listFolders = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_budget = parseInt(req.params.id_budget);

    if (!ID_budget) { throw { type: "custom", message: "missing data, add budget ID" } };

    const result = await FoldersLogic.getListFolders(ID_user, ID_budget);
    res.status(200).json({status:true, data: result});
};

module.exports.getFolderPath = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_folder = parseInt(req.params.id_folder);

    if (!ID_folder) { throw { type: "custom", message: "missing data, add folder ID" } };

    const result = await FoldersLogic.getFolderPath(ID_user, ID_folder);
    res.status(200).json({status:true, data: result});
};

module.exports.getFolderDescription = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_folder = parseInt(req.params.id_folder);

    if (!ID_folder) { throw { type: "custom", message: "missing data, add folder ID" } };

    const result = await FoldersLogic.getFolderDescription(ID_user, ID_folder);
    res.status(200).json({status:true, data: result});
};

module.exports.updateFolderDescription = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_folder = parseInt(req.params.id_folder);
    const allow = ["description"];

    if (!ID_folder) { throw { type: "custom", message: "missing data, add folder ID" } };

    const to_update = Helpers.getObjectToUpdate(allow, req.body)
    const userRole = await FoldersLogic.getUserRole(ID_user, ID_folder);

    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" }
    };

    await FoldersLogic.updateFolderDescription(ID_folder, to_update);
    res.status(200).json({status:true});
};

module.exports.getFolderMeasurements = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_folder = parseInt(req.params.id_folder);

    if (!ID_folder) { throw { type: "custom", message: "missing data, add folder ID" } };

    const result = await FoldersLogic.getFolderMeasurements(ID_user, ID_folder);
    res.status(200).json({status:true, data: result});
};

module.exports.updateFolderMeasurement = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_meas = parseInt(req.params.id_meas);
    const allow = ["quantity", "length", "width", "height", "formula", "description"];

    if (!ID_meas) { throw { type: "custom", message: "missing data, add measurement ID" } };

    const to_update = Helpers.getObjectToUpdate(allow, req.body)
    const userRole = await FoldersLogic.getMeasurementUserRole(ID_user, ID_meas);

    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" }
    };

    await FoldersLogic.updateFolderMeasurement(ID_meas, to_update);
    res.status(200).json({status:true});
};

module.exports.getFolderConditions = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_folder = parseInt(req.params.id_folder);

    if (!ID_folder) { throw { type: "custom", message: "missing data, add folder ID" } };

    const result = await FoldersLogic.getFolderConditions(ID_user, ID_folder);
    res.status(200).json({status:true, data: result});
};

module.exports.updateFolderConditions = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_folder = parseInt(req.params.id_folder);
    const allow = ["description"];

    if (!ID_folder) { throw { type: "custom", message: "missing data, add folder ID" } };

    const to_update = Helpers.getObjectToUpdate(allow, req.body)
    const userRole = await FoldersLogic.getUserRole(ID_user, ID_folder);

    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" }
    };

    await FoldersLogic.updateFolderConditions(ID_folder, to_update);
    res.status(200).json({status:true});
};

module.exports.addFolder = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_budget = req.body.id_budget;
    const required = ["id_budget", "code", "name"];

    if (!ID_budget) { throw { type: "custom", message: "missing data, add budget ID" } };

    Helpers.checkRequiredFields(required, req.body);

    const userRole = await BudgetLogic.getUserRole(ID_user, ID_budget);
    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" }
    };

    const result = await FoldersLogic.addFolder(req.body.id_budget, req.body.code, req.body.name);
    res.status(200).json({status:true, data: result[0]});
};

module.exports.updateFolder = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_folder = parseInt(req.params.id_folder);
    const allow = ["code", "name"];

    if (!ID_folder){ throw { type: "custom", message: "missing data, add folder ID" } };

    const to_update = Helpers.getObjectToUpdate(allow, req.body)
    const userRole = await FoldersLogic.getUserRole(ID_user, ID_folder);

    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" }
    };

    await FoldersLogic.updateFolder(ID_folder, to_update);
    res.status(200).json({status:true});
};

module.exports.deleteFolder = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_folder = parseInt(req.params.id_folder);

    if (!ID_folder){ throw { type: "custom", message: "missing data, add folder ID" } };

    const userRole = await FoldersLogic.getUserRole(ID_user, ID_folder);
    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" }
    };

    await FoldersLogic.deleteFolder(ID_folder);
    res.status(200).json({status:true});
};