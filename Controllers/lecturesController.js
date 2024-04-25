const lecture = require('../Models/lectures').lecture;

class LecturesController{
    create(obj)
    {
        if (!((obj.startTime instanceof Date) && (obj.endTime instanceof Date))){
            return { error: 'Invalid timestamps' };
        }
        else if(typeof(obj.lecturerID) !== 'string' || obj.lecturerID.length < 4){
            return { error: 'Invalid Lecturer' };
        }
        else if (typeof(obj.courseID) != 'string' || obj.courseID.length < 2) {
            return { error: 'Invalid Course' };
        }
        else if (typeof(obj.departmentID) != 'string' || obj.departmentID.length < 2) {
            return { error: 'Invalid Department' };
        }
        else if (typeof(obj.schoolID) != 'string' || obj.schoolID.length < 2) {
            return { error: 'Invalid School' };
        }
        else if (typeof(obj.venueID) != 'string' || obj.venueID.length < 2) {
            return { error: 'Invalid Venue' };
        }
        lecture.create(obj);
    }
    update(existObj, updatedObj)
    {
        if (updatedObj.length < 1) {
            return { error: 'Empty objects not allowed' };
        }
        lecture.update(existObj, updatedObj);
    }
    find(obj)
    {
        return lecture.find(obj);
    }
    delete(obj)
    {
        lecture.delete(obj);
    }
}
exports.lectureController = new LecturesController()