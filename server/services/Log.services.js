class Handler{

    async error(req ,res ,error ,params , statusCode){

        res.status(statusCode).send({
            message:error.message,
            status:statusCode,
            url:req.url,
            params
        })
        return;
    }

    async throwError(req ,res ,msg ,statusCode){

        const error = new Error(msg);
        error.status = statusCode;
        throw error;
        return;
    }
}

module.exports = Handler;