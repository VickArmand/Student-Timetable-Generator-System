const lecture = require('../Models/lectures').lecture;

class LecturesController{
    create(startTime, endTime, lecturerID, courseID, departmentID, schoolID, venueID)
    {
        if (!((startTime instanceof Date) && (endTime instanceof Date))){
            throw TypeError('Invalid timestamps');
        }
        else if(typeof(lecturerID) !== 'string' || lecturerID.length < 4){
            throw TypeError('Invalid Lecturer');
        }
        else if (typeof(courseID) != 'string' || courseID.length < 2) {
            throw TypeError('Invalid Course');
        }
        else if (typeof(departmentID) != 'string' || departmentID.length < 2) {
            throw TypeError('Invalid Department');
        }
        else if (typeof(schoolID) != 'string' || schoolID.length < 2) {
            throw TypeError('Invalid School');
        }
        else if (typeof(venueID) != 'string' || venueID.length < 2) {
            throw TypeError('Invalid Venue');
        }
        const obj = {startTime: startTime, endTime: endTime, lecturerID: lecturerID,courseID: courseID, departmentID: departmentID, schoolID: schoolID, venueID: venueID}; 
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
    find(obj)
    {
        lecture.find(obj);
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