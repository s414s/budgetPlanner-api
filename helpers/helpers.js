// Takes a list of allowed keys and returns a filtered object
module.exports.getObjectToUpdate = (listOfAllowedKeys, objFromRequest) => {

    let to_update = {};
    const keysBody = Object.keys(objFromRequest);

    listOfAllowedKeys.forEach(e => {
        if (keysBody.includes(e)) {
            to_update[e] = objFromRequest[e];
        }
    });
    
    if (Object.keys(keysBody).length === 0) {
        throw { type: "custom", message: "missing data, please send any element to update" }
    };

    return to_update;
};

// Takes a list of required keys and checks for missing field
module.exports.checkRequiredFields = (listOfRequiredKeys, objFromRequest) => {
    const keysBody = Object.keys(objFromRequest);
    let field = true;

    listOfRequiredKeys.forEach(e => { if (!keysBody.includes(e)) { field = e } });

    if (field !== true) {
        throw { type: "custom", message: `field ${field} missing` }
    }
};