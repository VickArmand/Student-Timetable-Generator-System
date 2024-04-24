const BaseModel = require('./baseModel').BaseModel;
class School extends BaseModel{
    collectionName = 'schools';
    constructor()
    {
        super();
        this.schema = this.mongoose.Schema({
            schoolName: {type: String, unique: true, required: true, maxlength: 50},
            created_at: {type: Date, default: Date.now},
            updated_at: {type: Date, default: Date.now}});
        this.schoolModel = this.mongoose.model(this.collectionName, this.schema);
    }
    create(obj)
    {
        this.schoolModel.create(obj).then((created_record)=>{
            if(!created_record) console.log("Creation failure");
            else console.log("Creation success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
    read(){
        records = [];
        this.schoolModel.find().each((err, doc)=>{
            if (err) console.log(err);
            records.push(doc);
        });
        return records;
    }
    find(obj)
    {
        return this.schoolModel.find(obj);
    }
    async update(existObj, updatedObj)
    {
        updated_at = new Date().toISOString();
        updatedObj.updated_at = updated_at;
        await this.schoolModel.findOneAndUpdate(existObj, updatedObj).then((updated_record)=>{
            if(!updated_record) console.log("Record not found");
            else console.log("Update success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
    async delete(obj)
    {
        await this.schoolModel.findOneAndDelete(obj).then((deleted_record)=>{
            if(!deleted_record) console.log("Record not found");
            else console.log("Deletion success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
}
exports.school = new School();