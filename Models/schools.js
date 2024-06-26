class School {
    collectionName = 'schools';
    mongoose = require('mongoose');
    constructor()
    {
        this.schema = this.mongoose.Schema({
            schoolName: {type: String, unique: true, required: true, maxlength: 50},
            created_at: {type: Date, default: Date.now},
            updated_at: {type: Date, default: Date.now}});
        this.schoolModel = this.mongoose.model(this.collectionName, this.schema);
    }
    async create(obj)
    {
        let response = {};
        await this.venueModel.create(obj).then((created_record)=>{
            if(!created_record) response.error = "Creation failure";
            else response = created_record;
        }).catch(err=>{
            response.error = err.message;
        });
        return response;
    }
    async find(obj)
    {
        let response = {};
        await this.venueModel.find(obj).then((records)=>{
            records.forEach((record) => response[record.id] = record);
        }).catch((err) => response.error = err.message);
        return response;
    }
    async update(existObj, updatedObj)
    {
        let response = {};
        if (!this.mongoose.Types.ObjectId.isValid(existObj._id))
            return {error: "Invalid ID"};
        updatedObj.updated_at = new Date().toISOString();
        await this.venueModel.findOneAndUpdate(existObj, updatedObj, {new: true}).then((updated_record)=>{
            if(!updated_record) response.error = "Record not found";
            else response = updated_record;
        }).catch(err=>{
            response.error = err.message;
        });
        return response;
    }
    async delete(obj)
    {
        let response = {};
        if (this.mongoose.Types.ObjectId.isValid(obj._id))
            await this.venueModel.findOneAndDelete(obj).then((deleted_record)=>{
                if(!deleted_record) response.error = "Record not found";
                else response.message = deleted_record;
            }).catch(err=>{
                response.error = err.message;
            });
        else response.error = "Invalid ID"
        return response;
    }
}
exports.school = new School();