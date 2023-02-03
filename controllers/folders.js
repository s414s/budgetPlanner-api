const BudgetLogic = require('../logic/budgets');
const FoldersLogic = require('../logic/folders');

module.exports.listFolders = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_budget = parseInt(req.params.id_budget);

    if (!ID_budget) { throw "Missing data, add ID of budget"; };

    const result = await FoldersLogic.listFolders(ID_user, ID_budget);
    res.status(200).json({status:true, data: result});
}

module.exports.folderDescription = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_folder = parseInt(req.params.id_folder);

    if (!ID_folder) { throw "Missing data, add ID of folder"; };

    const result = await FoldersLogic.getFolderDescription(ID_user, ID_folder);
    res.status(200).json({status:true, data: result});
}

module.exports.addFolder = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_budget = req.body.id_budget;
    const required = ["id_budget", "code", "name"];

    if (!ID_budget) { throw "Missing data, add ID of budget"; };

    // Check for missing fields
    const keysBody = Object.keys(req.body);
    let field = true;

    required.forEach(e => {if ( !keysBody.includes(e) ){ field = e }});

    if(field !== true){return res.status(401).json({status:false, error: ` ${field} missing`});}

    const userRole = await BudgetLogic.getUserRole(ID_user, ID_budget);
    if (!["creator", "editor"].includes(userRole)) { throw { type: "custom", message: "not allowed" } }

    const result = await FoldersLogic.addFolder(req.body.id_budget, req.body.code, req.body.name);

    res.status(200).json({status:true, data: result[0]});
}

module.exports.updateFolder = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_folder = parseInt(req.params.id_folder);
    const allow = ["code", "name"];

    if (!ID_folder) { throw "Missing data, add ID of folder"; };

    let to_update = {};
    const keysBody = Object.keys( req.body );

    allow.forEach(e => {
        if( keysBody.includes(e) ){
            to_update[e] = req.body[e];
        }
    });

    if( Object.keys(keysBody).length === 0 ){
        return res.status(403).json({status:false, error: "please send any element to update"});
    }

    const userRole = await FoldersLogic.getUserRole(ID_user, ID_folder);
    if (!["creator", "editor"].includes(userRole)) { throw "not allowed" }

    const result = await FoldersLogic.updateFolder(ID_folder, to_update);
    res.status(200).json({status:true});
}

module.exports.deleteFolder = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_folder = parseInt(req.params.id_folder);

    if (!ID_folder) { throw "Missing data, add ID of folder"; };

    const userRole = await FoldersLogic.getUserRole(ID_user, ID_folder);
    if (!["creator", "editor"].includes(userRole)) { throw "not allowed" }

    await FoldersLogic.deleteFolder(ID_folder);
    res.status(200).json({status:true});
}