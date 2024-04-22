const BaseModel = require('./baseModel').BaseModel;
class Venue extends BaseModel{
    collectionName = 'venues';
    constructor()
    {
        super();
        this.schema = this.mongoose.Schema({
            venueName: {type: String, unique: true, required: true, maxlength: 50},
            created_at: {type: Date, default: Date.now},
            updated_at: {type: Date, default: Date.now}});
        this.venueModel = this.mongoose.model(this.collectionName, this.schema);
    }
    create(obj)
    {
        this.venueModel.create(obj).then((created_record)=>{
            if(!created_record) console.log("Creation failure");
            else console.log("Creation success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
    read(){
        records = [];
        this.venueModel.find().each((err, doc)=>{
            if (err) console.log(err);
            records.push(doc);
        });
        return records;
    }
    find(obj)
    {
        return this.venueModel.find(obj);
    }
    update(id, obj)
    {
        updated_at = new Date().toISOString();
        obj.updated_at = updated_at;
        this.venueModel.update({id: id}, obj, (err)=>{
            if (err) console.log(err);});
    }
    delete(id)
    {
        this.venueModel.delete({id: id}, (err)=>{
            if (err) console.log(err);});
    }
}
exports.venue = new Venue();