const BaseModel = require('./baseModel').BaseModel;
class Lecture extends BaseModel{
    collectionName = 'lectures';
    constructor()
    {
        super();
        this.schema = this.mongoose.Schema({
            startTime: Date,
            endTime: Date,
            courseID: String,
            lecturerID: String,
            departmentID: String,
            schoolID: String,
            venueID: String,
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
    update(id, obj)
    {
        updated_at = new Date().toISOString();
        obj.updated_at = updated_at;
        this.lecturesModel.update({id: id}, obj, (err)=>{
            if (err) console.log(err);});
    }
    delete(id)
    {
        this.lecturesModel.delete({id: id}, (err)=>{
            if (err) console.log(err);});
    }
}
exports.lecture = new Lecture();