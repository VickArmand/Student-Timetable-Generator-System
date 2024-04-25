const BaseModel = require('./baseModel').BaseModel;
class LecturerDepartments extends BaseModel{
    collectionName = 'lecturerDepartments';
    constructor()
    {
        super();
        this.schema = this.mongoose.Schema({
            lecturerID: {type: String, required: true},
            departmentID: {type: String, required: true},
            created_at: {type: Date, default: Date.now},
            updated_at: {type: Date, default: Date.now}});
        this.lecturerDepartmentModel = this.mongoose.model(this.collectionName, this.schema);
    }
    async create(obj)
    {
        let response = {};
        await this.lecturerDepartmentModel.create(obj).then((created_record)=>{
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
        await this.lecturerDepartmentModel.find(obj).then((records)=>{
            records.forEach((record) => response[record.id] = record);
        }).catch((err) => response.error = err.message);
        return response;
    }
    async update(existObj, updatedObj)
    {
        let response = {};
        updatedObj.updated_at = new Date().toISOString();
        await this.lecturerDepartmentModel.findOneAndUpdate(existObj, updatedObj).then((updated_record)=>{
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
        await this.lecturerDepartmentModel.findOneAndDelete(obj).then((deleted_record)=>{
            if(!deleted_record) response.message = "Record not found";
            else response.message = "Delete success";
        }).catch(err=>{
            response.error = err.message;
        });
        return response;
    }
}
exports.LecturerDepartment = new LecturerDepartments();