
const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {

    console.log(req.headers)
    const token = req.body.token || req.query.token || req.headers.authorization;

    if(!token){
        return res.status(400).send("token is required for authentication");
    }

    try {

        const decoded = jwt.verify(token,  config.CLIENT_SECRET);
        req.user = decoded;

    }catch(err){
        return res.status(401).send("Invalid token")
    }

    return next();
}

module.exports= {
    verifyToken
}