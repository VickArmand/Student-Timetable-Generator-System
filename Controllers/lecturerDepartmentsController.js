const lecturerdepartments = require('../Models/lecturer_has_departments').LecturerDepartment;

class LecturerDepartmentsController{
    create(lecturerID, departmentID)
    {
        if (typeof(departmentID) != 'string' || departmentID.length < 2) {
            throw TypeError('Invalid Department');
        }
        else if (typeof(lecturerID) != 'string' || lecturerID.length < 2) {
            throw TypeError('Invalid Lecturer');
        }
        const obj = {lecturerID: lecturerID, departmentID:departmentID}; 
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
    find(obj)
    {
        lecturerdepartments.find(obj);
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