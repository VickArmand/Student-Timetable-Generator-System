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
    create(obj)
    {
        this.lecturerModel.create(obj).then((created_record)=>{
            if(!created_record) console.log("Creation failure");
            else console.log("Creation success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
    read(){
        records = [];
        this.lecturerModel.find().each((err, doc)=>{
            if (err) console.log(err);
            records.push(doc);
        });
        return records;
    }
    find(obj)
    {
        return this.lecturerModel.find(obj);
    }
    async update(existObj, updatedObj)
    {
        updatedObj.updated_at = new Date().toISOString();
        await this.lecturerModel.findOneAndUpdate(existObj, updatedObj).then((updated_record)=>{
            if(!updated_record) console.log("Record not found");
            else console.log("Update success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
    async delete(obj)
    {
        await this.lecturerModel.findOneAndDelete(obj).then((deleted_record)=>{
            if(!deleted_record) console.log("Record not found");
            else console.log("Deletion success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
}
exports.lecturer = new Lecturer()