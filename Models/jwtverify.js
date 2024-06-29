module.exports = function (token){
    try {
        const decoded = require('jsonwebtoken').verify(token, process.env.SECRET);
        return decoded;
    } catch (error) {
        return {error: error.message};
    }
}
