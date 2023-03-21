const PricesLogic = require('../logic/prices');
const Helpers = require('../helpers/helpers');

module.exports.listPrices = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_budget = parseInt(req.params.id_budget);

    if (!ID_budget) { throw { type: "custom", message: "missing data, add budget ID" } };

    const result = await PricesLogic.listPrices(ID_user, ID_budget);
    res.status(200).json({status:true, data: result});
};

module.exports.getPrice = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_price = parseInt(req.params.id_price);

    if (!ID_price){ throw { type: "custom", message: "missing data, add price ID" } };

    const result = await PricesLogic.getPrice(ID_user, ID_price);
    res.status(200).json({status:true, data: result});
};

module.exports.addPrice = async (req, res) => {
    const ID_user = req.user.ID;
    const required = ["code", "id_typeunit", "name", "price"];

    Helpers.checkRequiredFields(required, req.body);

    const userRole = await PricesLogic.getUserRole(ID_user, req.body.id_price);
    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" }
    };

    const result = await PricesLogic.addPrice(req.body.code, req.body.id_typeunit, req.body.name, req.body.price);
    res.status(200).json({status:true, data: result[0]});
};

module.exports.updatePrice = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_price = parseInt(req.params.id_price);
    const allow = ["code", "ID_typeunit", "name", "price"];

    if (!ID_price){ throw { type: "custom", message: "missing data, add price ID" } };

    const to_update = Helpers.getObjectToUpdate(allow, req.body)

    const userRole = await PricesLogic.getUserRole(ID_user, ID_price);
    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" };
    };

    const result = await PricesLogic.updatePrice(ID_price, to_update);
    res.status(200).json({status:true});
};

module.exports.deletePrice = async (req, res) => {
    const ID_user = req.user.ID;
    const ID_price = parseInt(req.params.id_price);

    if (!ID_price){ throw { type: "custom", message: "missing data, add price ID" }; };

    const userRole = await PricesLogic.getUserRole(ID_user, ID_price);
    if (!["creator", "editor"].includes(userRole)){
        throw { type: "custom", message: "not allowed" };
    };

    await PricesLogic.deletePrice(ID_price);
    res.status(200).json({status:true});
};