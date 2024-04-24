const BaseModel = require('./baseModel').BaseModel;
class Lecture extends BaseModel{
    collectionName = 'lectures';
    constructor()
    {
        super();
        this.schema = this.mongoose.Schema({
            startTime: {type: Date, required: true},
            endTime: {type: Date, required: true},
            courseID: {type: String, required: true},
            lecturerID: {type: String, required: true},
            departmentID: {type: String, required: true},
            schoolID: {type: String, required: true},
            venueID: {type: String, required: true},
            created_at: {type: Date, default: Date.now},
            updated_at: {type: Date, default: Date.now}
        });
        this.lecturesModel = this.mongoose.model(this.collectionName, this.schema);
    }
    create(obj)
    {
        this.lecturesModel.create(obj).then((created_record)=>{
            if(!created_record) console.log("Creation failure");
            else console.log("Creation success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
    read(){
        records = [];
        this.lecturesModel.find().each((err, doc)=>{
            if (err) console.log(err);
            records.push(doc);
        });
        return records;
    }
    find(obj)
    {
        return this.lecturesModel.find(obj);
    }
    async update(existObj, updatedObj)
    {
        updated_at = new Date().toISOString();
        updatedObj.updated_at = updated_at;
        await this.lecturesModel.findOneAndUpdate(existObj, updatedObj).then((updated_record)=>{
            if(!updated_record) console.log("Record not found");
            else console.log("Update success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
    async delete(obj)
    {
        await this.lecturesModel.findOneAndDelete(obj).then((deleted_record)=>{
            if(!deleted_record) console.log("Record not found");
            else console.log("Deletion success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
}
exports.lecture = new Lecture();