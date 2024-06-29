const { user } = require("../Models/users");
const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
const bcrypt = require('bcrypt');
const token = require('../Models/tokens');

class UserController {
    async register(req, res) {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if (!firstName || !lastName)
            return res.status(400).json({error: "Name required"});
        else if (!email || !emailRegex.test(email))
            return res.status(400).json({error: "Invalid email"});
        else if (!password || !confirmpassword)
            return res.status(400).json({error: "Password required"});
        else if (password !== confirmpassword)
            return res.status(400).json({error: "Passwords must be similar"});
        const hashedpassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
        req.body.password = hashedpassword;
        const regResult = await user.register(req.body);
        if (regResult.error)
            return res.status(401).json(regResult);
        return res.status(201).json(regResult);
    }
    async login(req, res) {
        if (req.isAuthenticated())
            return res.status(200).json({error: "Already logged in"});
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !emailRegex.test(email))
            return res.status(400).json({error: "Invalid email"});
        else if (!password)
            return res.status(400).json({error: "Password required"});
        const loginResult = await user.login(req.body);
        if (loginResult.error)
            return res.status(401).json(loginResult);
        return res.status(201).json(loginResult);
    }
    async logout(req, res) {
        const result = await token.delete({
            user_id: req.user.id,
            email: req.user.email,
            token: req.sessionID
        });
        if (result.error)
            return res.status(201).json({message: "Unauthorized"});
        delete req.session;
        delete req.user;
        delete req.sessionID;
        return res.status(201).json({message: "Logged out"});
    }
    async update(req, res) {
        const email = req.body.email;
        if (email && !emailRegex.test(email))
            return res.status(400).json({error: "Invalid email"});
        const result = await user.update(req.body);
        if (result.error)
            return res.status(401).json(result);
        return res.status(201).json(result);
    }
    async delete(req, res) {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({error: 'Id required'});
        const result = await user.delete({_id: id});
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
}

exports.userController = new UserController();