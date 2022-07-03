const User = require('../models/user');
const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
    try {


        const token = req.body.token;

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findOne({ _id: verifyToken._id });

        if (!user) {
            throw new Error("authentication problem .....");
        }

        req.rootUser = user;
        req.token = token;

        next();


    } catch (error) {
        console.log(error);
        res.status(402).send("error to authenticate...");
    }
}

module.exports = authenticate;