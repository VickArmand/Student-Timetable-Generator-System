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
    update(id, obj)
    {
        updated_at = new Date().toISOString();
        obj.updated_at = updated_at;
        this.schoolModel.update({id: id}, obj, (err)=>{
            if (err) console.log(err);});
    }
    delete(id)
    {
        this.schoolModel.delete({id: id}, (err)=>{
            if (err) console.log(err);});
    }
}
exports.school = new School();