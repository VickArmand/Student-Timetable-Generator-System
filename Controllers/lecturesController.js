const lecture = require('../Models/lectures').lecture;

class LecturesController{
    create(obj)
    {
        if (!((obj.startTime instanceof Date) && (obj.endTime instanceof Date))){
            throw TypeError('Invalid timestamps');
        }
        else if(typeof(obj.lecturerID) !== 'string' || obj.lecturerID.length < 4){
            throw TypeError('Invalid Lecturer');
        }
        else if (typeof(obj.courseID) != 'string' || obj.courseID.length < 2) {
            throw TypeError('Invalid Course');
        }
        else if (typeof(obj.departmentID) != 'string' || obj.departmentID.length < 2) {
            throw TypeError('Invalid Department');
        }
        else if (typeof(obj.schoolID) != 'string' || obj.schoolID.length < 2) {
            throw TypeError('Invalid School');
        }
        else if (typeof(obj.venueID) != 'string' || obj.venueID.length < 2) {
            throw TypeError('Invalid Venue');
        }
        lecture.create(obj);
    }
    update(id, obj)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        }
        else if (obj.length == 0) throw Error("Empty objects not allowed");
        lecture.update(id, obj);
    }
    async find(obj)
    {
        if (obj.length == 0) return await lecture.read();
        return await lecture.find(obj);
    }
    delete(id)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        } 
        lecture.delete(id);
    }
}
exports.lectureController = new LecturesController()