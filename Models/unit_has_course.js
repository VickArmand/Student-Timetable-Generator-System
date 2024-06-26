class UnitCourses {
    collectionName = 'unitCourses';
    mongoose = require('mongoose');
    constructor()
    {
        this.schema = this.mongoose.Schema({
            unitID: {type: String, required: true},
            lecturerID: {type: String, required: true},
            departmentID: {type: String, required: true},
            courseID: {type: String, required: true},
            schoolID: {type: String, required: true},
            created_at: {type: Date, default: Date.now},
            updated_at: {type: Date, default: Date.now}});
        this.unitCourseModel = this.mongoose.model(this.collectionName, this.schema);
    }
    async create(obj)
    {
        let response = {};
        await this.unitCourseModel.create(obj).then((created_record)=>{
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
        await this.unitCourseModel.find(obj).then((records)=>{
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
        await this.unitCourseModel.findOneAndUpdate(existObj, {$set: updatedObj}, {new: true}).then((updated_record)=>{
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
            await this.unitCourseModel.findOneAndDelete(obj).then((deleted_record)=>{
                if(!deleted_record) response.error = "Record not found";
                else response.message = deleted_record;
            }).catch(err=>{
                response.error = err.message;
            });
        else response.error = "Invalid ID"
        return response;
    }
}
exports.unitCourse = new UnitCourses();