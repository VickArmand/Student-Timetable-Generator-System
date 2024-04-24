const { type } = require('express/lib/response');

const BaseModel = require('./baseModel').BaseModel;
class Course extends BaseModel{
    collectionName = 'courses';
    constructor()
    {
        super();
        this.schema = this.mongoose.Schema({
            courseName: {type: String, unique: true, required: true, dropDups:true, maxlength: 50},
            years: {type: Number, required: true},
            semesters: {type: Number, required: true},
            departmentID: {type: String, required: true},
            schoolID: {type: String, required: true},
            created_at: {type: Date, default: Date.now},
            updated_at: {type: Date, default: Date.now}
        });
        this.courseModel = this.mongoose.model(this.collectionName, this.schema);
    }
    async create(obj)
    {
        try{
            await this.courseModel.create(obj).then((created_course)=>{
                if(!created_course) console.log("Creation failure");
                else console.log("Creation success");
            }).catch(err=>{
                console.log(err.message);
                throw err;
            });
        }
        catch(err) {throw err;}
    }
    async read(){
        try{
            records = [];
            await this.courseModel.find({}).then(
                (courses)=> {
                    records.add(courses);
                }
            );
            return records;
        } catch(err) {throw err;}
    }
    async find(obj)
    {
        const record = await this.courseModel.find(obj).then(
            (course)=> {return course}).catch((err) => {throw err;});
        return record;
    }
    async update(existObj, updatedObj)
    {
        updatedObj.updated_at = new Date().toISOString();
        await this.courseModel.findOneAndUpdate(existObj, updatedObj).then((updated_record)=>{
            if(!updated_record) console.log("Record not found");
            else console.log("Update success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
    async delete(obj)
    {
        await this.courseModel.findOneAndDelete(obj).then((deleted_record)=>{
            if(!deleted_record) console.log("Record not found");
            else console.log("Deletion success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
}
exports.course = new Course();