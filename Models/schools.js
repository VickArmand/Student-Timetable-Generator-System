const Db = require('./dbconn').Db;
class School extends Db{
    collectionName = 'schools';
    constructor()
    {
        this.db = super();
        this.collection = this.db.collection(this.collectionName);
        this.schema = this.mongoose.Schema({schoolName: String, created_at: Date, updated_at: Date});
        this.schoolModel = this.mongoose.model(this.collectionName, this.schema);
    }
    create(schoolName)
    {
        created_at = new Date().toISOString();
        updated_at = new Date().toISOString();
        this.collection.insert({schoolName:schoolName, created_at: created_at, updated_at: updated_at}, (err)=>{
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