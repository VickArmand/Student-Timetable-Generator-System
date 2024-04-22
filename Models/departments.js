const BaseModel = require('./baseModel').BaseModel;
class Department extends BaseModel{
    collectionName = 'departments';
    constructor()
    {
        super();
        this.schema = this.mongoose.Schema({
            departmentName: {type: String, unique: true, required: true, maxlength: 50},
            schoolID: String, created_at: {type: Date, default: Date.now},
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
    update(id, obj)
    {
        updated_at = new Date().toISOString();
        obj.updated_at = updated_at;
        this.departmentModel.update({id: id}, obj, (err)=>{
            if (err) console.log(err);});
    }
    delete(id)
    {
        this.departmentModel.delete({id: id}, (err)=>{
            if (err) console.log(err);});
    }
}
exports.department = new Department();