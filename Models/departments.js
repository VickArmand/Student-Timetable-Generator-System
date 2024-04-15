const Db = require('./dbconn').Db;
class Department extends Db{
    collectionName = 'departments';
    constructor()
    {
        super();
        this.collection = this.db.collection(this.collectionName);
        this.schema = this.mongoose.Schema({
            departmentName: String, schoolID: String, created_at: Date, updated_at: Date
        });
        this.departmentModel = this.mongoose.model(this.collectionName, this.schema);
    }
    create(departmentName, schoolID)
    {
        created_at = new Date().toISOString();
        updated_at = new Date().toISOString();
        this.collection.insert({departmentName: departmentName, schoolID:schoolID, created_at: created_at, updated_at: updated_at}, (err)=>{
            if (err) console.log(err);
            else console.log("Insert success");
        });
    }
    read(){
        records = [];
        this.collection.find().each((err, doc)=>{
            if (err) console.log(err);
            records.push(doc);
        });
        return records;
    }
    find(obj)
    {
        return this.collection.find(obj);
    }
    update(id, obj)
    {
        updated_at = new Date().toISOString();
        obj.updated_at = updated_at;
        this.collection.update({id: id}, obj, (err)=>{
            if (err) console.log(err);});
    }
    delete(id)
    {
        this.collection.delete({id: id}, (err)=>{
            if (err) console.log(err);});
    }
}