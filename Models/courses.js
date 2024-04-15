const BaseModel = require('./baseModel').BaseModel;
exports.Course = class Course extends BaseModel{
    collectionName = 'courses';
    constructor()
    {
        super();
        this.schema = this.mongoose.Schema({name: {type: String, unique: true, required: true, dropDups:true, maxlength: 50}, created_at: {type: Date, default: Date.now}, updated_at: {type: Date, default: Date.now}});
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
            await this.courseModel.find({}).then(
                (courses)=> {
                    console.log(courses);
                    return courses;
                }
            );
        } catch(err) {throw err;}
    }
    async find(obj)
    {
        try{
            await this.courseModel.find(obj).then(
                (course)=> {console.log(course);}
            );;
        } catch(err) {throw err;}
    }
    async update(id, obj)
    {
        const updated_at = new Date().toISOString();
        obj.updated_at = updated_at;
        await this.courseModel.updateOne({_id: id}, obj).then((updated_course)=>{
            if(!updated_course) console.log("Updation failure");
            else console.log("Updation success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
    async delete(id)
    {
        await this.courseModel.deleteOne({_id: id}).then((deleted_course)=>{
            if(!deleted_course) console.log("Deletion failure");
            else console.log("Deletion success");
        }).catch(err=>{
            console.log(err.message);
            throw err;
        });
    }
}