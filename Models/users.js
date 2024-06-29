const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');
const token = require('./tokens');
const jwt = require('jsonwebtoken');

class User {
    mongoose = require('mongoose');
    collectionName = 'users';
    constructor() {
        this.schema = this.mongoose.Schema({
            email: {type: String, required:true, unique: true, maxlength: 200},
            password: {type: String, required:true, unique: true, maxlength: 300},
            firstName: {type: String, required:true, maxlength: 200},
            lastName: {type: String, required:true, maxlength: 200},
            created_at: {type: Date, default: Date.now},
            updated_at: {type: Date, default: Date.now}
        });
        this.schema.plugin(passportLocalMongoose);
        this.userModel = this.mongoose.model(this.collectionName, this.schema);
    }
    async register(obj) {
        let response = {};
        await this.userModel.create(obj).then((created_record)=>{
            if(!created_record) response.error = "Registration failure";
            else response = created_record;
        }).catch(err=>{
            response.error = err.message;
        });
        return response;
    }
    async login(obj) {
        let response = {};
        await this.userModel.findOne({email: obj.email}).then(async (user)=>{
            if (!user || Object.keys(user).length < 1) {
                response.error = "User Not Found";
            }
            if (!await bcrypt.compare(obj.password, user.password)) {
                response.error = "Incorrect email or password";
            }
            const accessToken = jwt.sign({id: user._id, email: user.email}, process.env.SECRET, {expiresIn: "1d"});
            response.id = user._id;
            response.email = user.email;
            response.accessToken = accessToken;
            const decoded = jwt.verify(accessToken, process.env.SECRET);
            await token.create({
                user_id: user.id,
                email: user.email,
                token: accessToken,
                issued_at: decoded.iat,
                expire_at: decoded.exp
            });
        }).catch((err) => {response.error = err.message});
        return response;
    }
    async logout(obj) {
    }
    async update(existObj, updatedObj) {
        let response = {};
        if (!this.mongoose.Types.ObjectId.isValid(existObj._id))
            return {error: "Invalid ID"};
        updatedObj.updated_at = new Date().toISOString();
        await this.userModel.findOneAndUpdate(existObj, {$set: updatedObj}, {new: true}).then((updated_record)=>{
            if(!updated_record) response.error = "Record not found";
            else response = updated_record;
        }).catch(err=>{
            response.error = err.message;
        });
        return response;
    }
    async delete(obj) {
        let response = {};
        if (this.mongoose.Types.ObjectId.isValid(obj._id))
            await this.userModel.findOneAndDelete(obj).then((deleted_record)=>{
                if(!deleted_record) response.error = "Record not found";
                else response.message = deleted_record;
            }).catch(err=>{
                response.error = err.message;
            });
        else response.error = "Invalid ID"
        return response;
    }
}
exports.user = new User();