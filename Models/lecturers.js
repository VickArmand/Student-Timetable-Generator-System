const BaseModel = require('./baseModel').BaseModel;
class Lecturer extends BaseModel{
    collectionName = 'lecturers';
    constructor()
    {
        super();
        this.schema = this.mongoose.Schema({
            firstName: {type: String, required: true},
            lastName: {type: String, required: true},
            created_at: {type: Date, default: Date.now},
            updated_at: {type: Date, default: Date.now}});
        this.lecturerModel = this.mongoose.model(this.collectionName, this.schema);
    }
    async create(obj)
    {
        let response = {};
        await this.lecturerModel.create(obj).then((created_record)=>{
            if(!created_record) response.message = "Creation failure";
            else response = created_record;
        }).catch(err=>{
            response.message = err.message;
        });
        return response;
    }
    async find(obj)
    {
        let response = {};
        await this.lecturerModel.find(obj).then((records)=>{
            records.forEach((record) => response[record.id] = record);
        }).catch((err) => response.error = err.message);
        return response;
    }
    async update(existObj, updatedObj)
    {
        let response = {};
        updatedObj.updated_at = new Date().toISOString();
        await this.lecturerModel.findOneAndUpdate(existObj, updatedObj).then((updated_record)=>{
            if(!updated_record) response.message = "Record not found";
            else response.message = "Update success";
        }).catch(err=>{
            response.error = err.message;
        });
        return response;
    }
    async delete(obj)
    {
        let response = {};
        await this.lecturerModel.findOneAndDelete(obj).then((deleted_record)=>{
            if(!deleted_record) response.message = "Record not found";
            else response.message = "Delete success";
        }).catch(err=>{
            response.error = err.message;
        });
        return response;
    }
}
exports.lecturer = new Lecturer()