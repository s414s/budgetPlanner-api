
const wrapper = (fn, error) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (errorCatch) {
        //console.log("error", error);
        res.status(400).json({
            status:false,
            error:
            {
                location: error,
                message: (errorCatch?.type === "custom" ? errorCatch.message : "")
            }
        });
    }
};

module.exports = {wrapper};