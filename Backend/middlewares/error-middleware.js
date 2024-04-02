const errorMiddleware = (err, req, res, next) => {
const status = err.status || 500;
const message = err.message || "BACKEND ERROR";
console.log(`status: ${err.statusCode},${err.status}`)
return res.status(status).json({isError:true, message:message})
};


module.exports = errorMiddleware;