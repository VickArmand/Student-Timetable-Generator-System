const BaseModel = require('./baseModel').BaseModel;
class Department extends BaseModel{
    collectionName = 'departments';
    constructor()
    {
        super();
        this.schema = this.mongoose.Schema({
            departmentName: {type: String, unique: true, required: true, maxlength: 50},
            schoolID: {type: String, required: true},
            created_at: {type: Date, default: Date.now},
            updated_at: {type: Date, default: Date.now}
        });
        this.departmentModel = this.mongoose.model(this.collectionName, this.schema);
    }
    create(obj)
    {
        this.departmentModel.create(obj).then((created_dept)=>{
            if(!created_dept) console.log("Creation failure");
            else console.log("Creation success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
    read(){
        records = [];
        this.departmentModel.find().each((err, doc)=>{
            if (err) console.log(err);
            records.push(doc);
        });
        return records;
    }
    find(obj)
    {
        return this.departmentModel.find(obj);
    }
    async update(existObj, updatedObj)
    {
        updated_at = new Date().toISOString();
        updatedObj.updated_at = updated_at;
        await this.departmentModel.findOneAndUpdate(existObj, updatedObj).then((updated_record)=>{
            if(!updated_record) console.log("Record not found");
            else console.log("Update success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
    async delete(obj)
    {
        await this.departmentModel.findOneAndDelete(obj).then((deleted_record)=>{
            if(!deleted_record) console.log("Record not found");
            else console.log("Deletion success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
}
exports.department = new Department();