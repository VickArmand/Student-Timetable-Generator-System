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
    async update(existObj, updatedObj)
    {
        updated_at = new Date().toISOString();
        updatedObj.updated_at = updated_at;
        await this.venueModel.findOneAndUpdate(existObj, updatedObj).then((updated_record)=>{
            if(!updated_record) console.log("Record not found");
            else console.log("Update success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
    async delete(obj)
    {
        await this.venueModel.findOneAndDelete(obj).then((deleted_record)=>{
            if(!deleted_record) console.log("Record not found");
            else console.log("Deletion success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
}
exports.venue = new Venue();