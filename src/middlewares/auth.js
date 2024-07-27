const jwt = require('jsonwebtoken')

const { responseTemplate, responseMessage } = require("../utils/response");

const jwt_token_secret_access = process.env.TOKEN_SECRET_KEY;

const JWTMiddleware = async (req, res, next) => { 
    const accessToken  = req.headers.accesstoken;
    if (accessToken) {
        try {
            let decryptedToken = jwt.verify(accessToken, jwt_token_secret_access);
            if (decryptedToken) {
                req.user = decryptedToken;
                return next();
            }
            else {
                return res.status(401).json(await responseTemplate(false, responseMessage.invalidToken, null, null))
            }
        } catch (err) {
            if (err.message == "invalid signature") return res.status(403).json(await responseTemplate(false, responseMessage.differentToken, null, null))
            return res.status(401).json(await responseTemplate(false, responseMessage.invalidToken, null, null))
        }
    } else {
        return res.status(401).json(await responseTemplate(false, responseMessage.tokenNotFound, null, null));
    }
}

const JWTEncryptAccess = document => {
    return jwt.sign({
        _id: document._id,
    }, jwt_token_secret_access);
}

module.exports = { JWTMiddleware, JWTEncryptAccess }