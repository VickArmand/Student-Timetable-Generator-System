const course = require('../Models/courses').course;

class CoursesController{
    create(obj)
    {
        if (typeof(obj.years) !== 'number' || obj.years < 1){
            return { error: 'Invalid years' };
        }
        else if(typeof(obj.semesters) !== 'number' || obj.semesters < 1){
            return {error: 'Invalid semesters' };
        }
        else if (typeof(obj.courseName) != 'string' || obj.courseName.length < 2) {
            return {error: 'Invalid Course' };
        }
        else if (typeof(obj.departmentID) != 'string' || obj.departmentID.length < 2) {
            return {error: 'Invalid Department' };
        }
        else if (typeof(obj.schoolID) != 'string' || obj.schoolID.length < 2) {
            return {error: 'Invalid School' };
        }
        course.create(obj);
    }
    update(existObj, updatedObj)
    {
        if (updatedObj.length < 1) {
            return { error: 'Empty objects not allowed' };
        }
        venue.update(existObj, updatedObj);
    }
    find(obj)
    {
        return venue.find(obj);
    }
    delete(obj)
    {
        venue.delete(obj);
    }
}
exports.courseController = new CoursesController();