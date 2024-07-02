const unitCourse = require('./unit_has_course.js').unitCourse;
const lecturer = require('../Models/lecturers').lecturer;
const venue = require('./venues.js').venue;
const course = require('./courses.js').course;
const unit = require('./units').unit;

class StaticLecture {
    collectionName = 'staticlectures';
    mongoose = require('mongoose');
    constructor()
    {
        this.schema = this.mongoose.Schema({
            startTime: {type: String, required: true},
            endTime: {type: String, required: true},
            unitCourseID: {type: String, required: true},
            day: {type: String, required: true},
            venueID: {type: String, required: true},
            created_at: {type: Date, default: Date.now},
            updated_at: {type: Date, default: Date.now}
        });
        this.staticlecturesModel = this.mongoose.model(this.collectionName, this.schema);
    }
    async create(obj)
    {
        let response = {};
        await this.staticlecturesModel.create(obj).then((created_record)=>{
            if(!created_record) response.error = "Creation failure";
            else response = created_record;
        }).catch(err=>{
            response.error = err.message;
        });
        return response;
    }
    async detailed_records(record) {
        const nr = {}
        const unitCourseResult = await unitCourse.find({_id: record.unitCourseID});
        const venueResult = await venue.find({_id: record.venueID});
        if (unitCourseResult.error) {
            nr.unitName = unitCourseResult.error;
            nr.courseName = unitCourseResult.error;
            nr.lecturerName = unitCourseResult.error;
        }
        else{
            nr.year = unitCourseResult[record.unitCourseID].year;
            nr.semester = unitCourseResult[record.unitCourseID].semester;
            const courseResult = await course.find({_id: unitCourseResult[record.unitCourseID].courseID});
            nr.courseName = courseResult.error ? courseResult.error : courseResult[unitCourseResult[record.unitCourseID].courseID].courseName;
            const lecturerResult = await lecturer.find({_id: unitCourseResult[record.unitCourseID].lecturerID});
            nr.lecturerName = lecturerResult.error ? lecturerResult.error : lecturerResult[unitCourseResult[record.unitCourseID].lecturerID].firstName + ' ' + lecturerResult[unitCourseResult[record.unitCourseID].lecturerID].lastName;
            const unitResult = await unit.find({_id: unitCourseResult[record.unitCourseID].unitID});
            nr.unitName = unitResult.error ? unitResult.error : unitResult[unitCourseResult[record.unitCourseID].unitID].unitName;
        }
        nr.venueName = venueResult.error ? venueResult.error: venueResult[record.venueID].venueName;
        nr.startTime = record.startTime;
        nr.endTime = record.endTime;
        nr.day = record.day;
        nr.unitCourseID = record.unitCourseID;
        nr.venueID = record.venueID;
        nr._id = record._id;
        nr.created_at = record.created_at;
        nr.updated_at = record.updated_at;
        return nr;
    }
    async find(obj)
    {
        let response = {};
        if (obj._id && !this.mongoose.Types.ObjectId.isValid(obj._id))
            return {error: "Invalid ID"};
        await this.staticlecturesModel.find(obj).then((records)=>{
            if (records.length < 1)
                response.error = "Record Not Found";
            else
                records.forEach((record) => response[record.id] = record);
        }).catch((err) => response.error = err.message);
        if (!response.error){
            for (const [key, value] of Object.entries(response)){
                const record = await this.detailed_records(value);
                response[key] = record;
            }
        }
        return response;
    }
    async update(existObj, updatedObj)
    {
        let response = {};
        if (!this.mongoose.Types.ObjectId.isValid(existObj._id))
            return {error: "Invalid ID"};
        updatedObj.updated_at = new Date().toISOString();
        await this.staticlecturesModel.findOneAndUpdate(existObj, {$set: updatedObj}, {new: true}).then((updated_record)=>{
            if(!updated_record) response.error = "Record not found";
            else response = updated_record;
        }).catch(err=>{
            response.error = err.message;
        });
        return response;
    }
    async delete(obj)
    {
        let response = {};
        if (this.mongoose.Types.ObjectId.isValid(obj._id))
            await this.staticlecturesModel.findOneAndDelete(obj).then((deleted_record)=>{
                if(!deleted_record) response.error = "Record not found";
                else response.message = deleted_record;
            }).catch(err=>{
                response.error = err.message;
            });
        else response.error = "Invalid ID"
        return response;
    }
}
exports.staticlecture = new StaticLecture();