const lecturerdepartments = require('../Models/lecturer_has_departments').LecturerDepartment;

class LecturerDepartmentsController{
    create(obj)
    {
        if (typeof(obj.departmentID) != 'string' || obj.departmentID.length < 2) {
            throw TypeError('Invalid Department');
        }
        else if (typeof(obj.lecturerID) != 'string' || obj.lecturerID.length < 2) {
            throw TypeError('Invalid Lecturer');
        }
        lecturerdepartments.create(obj);
    }
    update(id, obj)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        }
        else if (obj.length == 0) throw Error("Empty objects not allowed");
        lecturerdepartments.update(id, obj);
    }
    async find(obj)
    {
        if (obj.length == 0) return await lecturerdepartments.read();
        return await lecturerdepartments.find(obj);
    }
    delete(id)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        } 
        lecturerdepartments.delete(id);
    }
}
exports.lecturerDepartmentController = new LecturerDepartmentsController();