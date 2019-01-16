// CommonError的错误会被errorHandler拦截，且不报500异常
module.exports = class CommonError extends Error {}
