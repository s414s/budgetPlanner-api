const BudgetLogic = require('../logic/budgets');

module.exports.listBudget = async (req, res) => {
    const ID_user = req.user.ID;

    const result = await BudgetLogic.listBudgetByUser(ID_user);

    res.status(200).json({status:true, data: result});
}

module.exports.getBudgetById = async (req, res) => {
    const ID_budget = parseInt(req.params.id_budget);
    const ID_user = req.user.ID;

    if (!ID_budget) { throw "Missing data, add budget ID" };

    const result = await BudgetLogic.getBudgetById(ID_user, ID_budget);

    if(result.length > 0) {
        res.status(200).json({ status: true, data: result[0] });
    } else {
        res.status(204).json({ status: false })
    }
}

module.exports.assignBudgetToUser = async (req, res) => {
    const required = ["ID_budget", "ID_user", "role"];
    const ID_user = req.user.ID;

    // Check for missing info
    const keysBody = Object.keys( req.body );
    let OK = true;

    required.forEach(e=>{ if( !keysBody.includes(e) ){ OK = e; } })

    //if(OK !== true){ return res.status(401).json({status:false, error: `need ${OK} element`}); }
    if(OK !== true){ throw `missing information, need ${OK} element`};

    const userRole = await BudgetLogic.getUserRole(ID_user, ID_budget);
    
    if (userRole !== "creator") { throw "not allowed" }

    const result = await BudgetLogic.assignBudgetToUser(req.body.ID_user, req.body.ID_budget, req.body.role);

    if (!result) { res.status(403).json({status:false, error:"unexpected error"}); }
    res.json({status:true, data: result[0]});
}

module.exports.addBudget = async (req, res) => {
    const ID_user = req.user.ID;
    const required = ["title"];

    const keysBody = Object.keys(req.body);
    let field = true;

    required.forEach(e => {if ( !keysBody.includes(e) ){ field = e }});

    if (field !== true) {
        //return res.status(401).json({status:false, error: ` ${field} missing`});
        throw `missing fields, need ${field} field`
    }
    
    const result = await BudgetLogic.addBuget(req.body.title)

    if (result.length > 0) {
        await BudgetLogic.assignBudgetToUser(ID_user, result[0], "editor")
    } else {
        throw "budget not created"
    }

    res.json({status:true, data: result[0]});
}

module.exports.updateBudget = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_budget = parseInt(req.params.id_budget);
    
    // check editable fields
    const allow = ["title"];
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

    const userRole = await BudgetLogic.getUserRole(ID_user, ID_budget);
    if (!["creator", "editor"].includes(userRole)) { throw "not allowed" }

    const result = await BudgetLogic.updateBudget(ID_budget, to_update);

    res.json({status:true});
}

module.exports.deleteBudget = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_budget = parseInt(req.params.id_budget);

    const userRole = await BudgetLogic.getUserRole(ID_user, ID_budget);
    if (userRole !== "creator") { throw "not allowed" }

    await BudgetLogic.deleteBudget(ID_budget);

    res.json({status:true});
}

