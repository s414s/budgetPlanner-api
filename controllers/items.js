const GroupsLogic = require('../logic/groups');
const ItemsLogic = require('../logic/items');

module.exports.listItems = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_group = parseInt(req.params.id_group);

    if (!ID_group) {
        throw { type: "custom", message: "missing data, add group ID" }
    };

    const result = await ItemsLogic.listFolders(ID_user, ID_group);
    res.status(200).json({status:true, data: result});
};

module.exports.addItem = async (req, res) => {
    const ID_user = req.user.ID;
    const required = ["id_price", "id_group"];

    // Check for missing fields
    const keysBody = Object.keys(req.body);
    let field = true;

    required.forEach(e => {if ( !keysBody.includes(e) ){ field = e }});

    if(field !== true){
        throw { type: "custom", message: `missing data, add ${field}` };
    }

    const userRole = await GroupsLogic.getUserRole(ID_user, req.body.id_group);
    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" }
    };

    const result = await ItemsLogic.addItem(req.body.id_group, req.body.id_price);

    res.status(200).json({status:true, data: result[0]});
};

module.exports.updateItem = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_item = parseInt(req.params.id_item);
    const allow = ["factor"];

    if (!ID_item){
        throw { type: "custom", message: "missing data, add item ID" };
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
    };

    const userRole = await ItemsLogic.getUserRole(ID_user, ID_item);
    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" };
    };

    const result = await ItemsLogic.updateItem(ID_item, to_update);
    res.status(200).json({status:true});
};

module.exports.deleteItem = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_item = parseInt(req.params.id_item);

    if (!ID_item) { throw "Missing data, add ID of folder"; };

    const userRole = await ItemsLogic.getUserRole(ID_user, ID_item);
    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" };
    };

    await ItemsLogic.deleteItem(ID_item);
    res.status(200).json({status:true});
};