const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);  // Next function will be the error handler.
        }
    }
};

module.exports = asyncWrapper;