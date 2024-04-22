const course = require('../Models/courses').course;

class CoursesController{
    create(courseName, years, semesters, departmentID, schoolID)
    {
        if (typeof(years) !== 'number' || years < 1){
            throw TypeError('Invalid years');
        }
        else if(typeof(semesters) !== 'number' || semesters < 1){
            throw TypeError('Invalid semesters');
        }
        else if (typeof(courseName) != 'string' || courseName.length < 2) {
            throw TypeError('Invalid Course');
        }
        else if (typeof(departmentID) != 'string' || departmentID.length < 2) {
            throw TypeError('Invalid Department');
        }
        else if (typeof(schoolID) != 'string' || schoolID.length < 2) {
            throw TypeError('Invalid School');
        }
        const obj = {courseName:courseName, years:years,semesters:semesters, departmentID:departmentID, schoolID:schoolID}; 
        course.create(obj);
    }
    update(id, obj)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        }
        else if (obj.length == 0) throw Error("Empty objects not allowed");
        course.update(id, obj);
    }
    find(obj)
    {
        return course.find(obj);
    }
    delete(id)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        } 
        course.delete(id);
    }
}
exports.courseController = new CoursesController();