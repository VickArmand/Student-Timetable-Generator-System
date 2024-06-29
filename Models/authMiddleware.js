const jwtverify = require('./jwtverify');
const token = require('./tokens');

module.exports = async function isAuthorizedMiddleWare(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.split(" ")[1])
        return res.status(401).json({error: "Unauthorized"});
    const accesstoken = authHeader.split(" ")[1]
    const result = jwtverify(accesstoken);
    const response = await token.find({token: accesstoken});
    if (result.error || response.error)
        return res.status(401).json({error: "Unauthorized"});
    req.user = result;
    req.session = result;
    req.sessionID = accesstoken;
    next();
}