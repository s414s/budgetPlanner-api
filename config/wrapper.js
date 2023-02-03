
const wrapper = (fn, error) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (errorCatch) {
        console.log("error", error);
        res.status(400).json({
            status:false,
            error:
            {
                location: error,
                // hacer un ternario para ver si es del tipo custom con el elvis
                message: (errorCatch?.type === "custom" ? errorCatch.message : "")
                //message: errorCatch
            }
        });
    }
};

module.exports = {wrapper};