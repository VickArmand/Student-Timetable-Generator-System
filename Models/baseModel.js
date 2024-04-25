class BaseModel{
    constructor(){
        this.mongoose = require('mongoose');
        this.uri = "mongodb://localhost:27017/";
        this.dbName = "timetabledb";
        this.connectDB();
        this.mongoose.connection.on('connected', ()=>{
            console.log("connection success");
        });
        this.mongoose.connection.on('error', err=>{
            console.log("connection error: ", err);
        });
        this.mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        }); 
    }
    async connectDB()
    {
        try {
            await this.mongoose.connect(this.uri + this.dbName); 
        } catch (err) {
            throw err;
        }
    }
    async exit()
    {
        this.mongoose.close();
    }
}
module.exports = new BaseModel();