const notFound = (req, res, next) => res.status(404).send({msg: `Not found - ${req.originalUrl}`});
module.exports = notFound;