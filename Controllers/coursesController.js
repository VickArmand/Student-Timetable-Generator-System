const course = require('../Models/courses').course;

class CoursesController{
    create(obj)
    {
        if (typeof(obj.years) !== 'number' || obj.years < 1){
            throw TypeError('Invalid years');
        }
        else if(typeof(obj.semesters) !== 'number' || obj.semesters < 1){
            throw TypeError('Invalid semesters');
        }
        else if (typeof(obj.courseName) != 'string' || obj.courseName.length < 2) {
            throw TypeError('Invalid Course');
        }
        else if (typeof(obj.departmentID) != 'string' || obj.departmentID.length < 2) {
            throw TypeError('Invalid Department');
        }
        else if (typeof(obj.schoolID) != 'string' || obj.schoolID.length < 2) {
            throw TypeError('Invalid School');
        }
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
    async find(obj)
    {
        if (obj.length == 0) return await course.read();
        return await course.find(obj);
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