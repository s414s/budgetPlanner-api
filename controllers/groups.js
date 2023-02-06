const FoldersLogic = require('../logic/folders');
const GroupsLogic = require('../logic/groups');

module.exports.listGroups = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_folder = parseInt(req.params.id_folder);

    if (!ID_folder) {
        throw { type: "custom", message: "missing data, add folder ID" }
    };

    const result = await GroupsLogic.listGroupsByFolder(ID_user, ID_folder);
    res.status(200).json({status:true, data: result});
};

module.exports.groupDescription = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_group = parseInt(req.params.id_group);

    if (!ID_group) {
        throw { type: "custom", message: "missing data, add group ID" }
    };

    const result = await GroupsLogic.getGroupDescription(ID_user, ID_group);
    res.status(200).json({status:true, data: result});
};

module.exports.addGroup = async (req, res) => {
    const ID_user = req.user.ID;
    const required = ["id_folder", "code", "id_typeunit", "name"];

    // Check for missing fields
    const keysBody = Object.keys(req.body);
    let field = true;

    required.forEach(e => {if ( !keysBody.includes(e) ){ field = e }});

    if(field !== true){
        throw { type: "custom", message: `missing data, add ${field}` };
    };

    const userRole = await FoldersLogic.getUserRole(ID_user, req.body.id_folder);
    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" };
    };

    const result = await GroupsLogic.addGroup(req.body.id_folder, req.body.code, req.body.id_typeunit, req.body.name);

    res.status(200).json({status:true, data: result[0]});
};

module.exports.updateGroup = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_group = parseInt(req.params.id_group);
    const allow = ["id_folder", "code", "name", "description", "amount"];

    if (!ID_group) {
        throw { type: "custom", message: "missing data, add group ID" }
    };

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

    const userRole = await GroupsLogic.getUserRole(ID_user, ID_group);
    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" };
    };

    const result = await GroupsLogic.updateGroup(ID_group, to_update);
    res.status(200).json({status:true, data: result[0]});
};

module.exports.deleteGroup = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_group = parseInt(req.params.id_group);

    if (!ID_group) { throw { type: "custom", message: "missing data, add group ID" } };

    const userRole = await GroupsLogic.getUserRole(ID_user, ID_group);
    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" };
    };

    await GroupsLogic.deleteGroup(ID_group);
    res.status(200).json({status:true});
};