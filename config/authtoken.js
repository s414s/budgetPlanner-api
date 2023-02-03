const db = require("./DDBB");

const authToken = async (req, res, next) => {

    // Check if has token
        if( req.headers?.token === undefined ){
            return res.status(401).json({status:false, error: "Header token is empty"});
        }

    // Check if the token exist
        const result = await db
            .select(["ID", "name", "role"])
            .from("users")
            .where("token", req.headers.token);

        if( result.length === 0 ){
            return res.status(401).json({status:false, error: "Invalid token"});
        }

    req.user = { ...result[0] };

    next();

}


const authAdmin = async (req, res, next) => {

    if(req?.user === undefined){
        return res.status(401).json({status:false, error: "Please, call the administrator"});
    }

    if( req.user.rol !== "admin" ){
        return res.status(401).json({status:false, error: "you are not admin"});
    }

    next();

}

module.exports = {authToken, authAdmin};