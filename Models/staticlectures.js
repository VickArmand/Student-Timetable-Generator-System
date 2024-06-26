class StaticLecture {
    collectionName = 'staticlectures';
    mongoose = require('mongoose');
    constructor()
    {
        this.schema = this.mongoose.Schema({
            startTime: {type: String, required: true},
            endTime: {type: String, required: true},
            unitCourseID: {type: String, required: true},
            day: {type: String, required: true},
            venueID: {type: String, required: true},
            created_at: {type: Date, default: Date.now},
            updated_at: {type: Date, default: Date.now}
        });
        this.staticlecturesModel = this.mongoose.model(this.collectionName, this.schema);
    }
    async create(obj)
    {
        let response = {};
        await this.staticlecturesModel.create(obj).then((created_record)=>{
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
        if (obj._id && !this.mongoose.Types.ObjectId.isValid(obj._id))
            return {error: "Invalid ID"};
        await this.staticlecturesModel.find(obj).then((records)=>{
            if (records.length < 1)
                response.error = "Record Not Found";
            else
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
        await this.staticlecturesModel.findOneAndUpdate(existObj, {$set: updatedObj}, {new: true}).then((updated_record)=>{
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
            await this.staticlecturesModel.findOneAndDelete(obj).then((deleted_record)=>{
                if(!deleted_record) response.error = "Record not found";
                else response.message = deleted_record;
            }).catch(err=>{
                response.error = err.message;
            });
        else response.error = "Invalid ID"
        return response;
    }
}
exports.staticlecture = new StaticLecture();