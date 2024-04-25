const lecturerdepartments = require('../Models/lecturer_has_departments').LecturerDepartment;

class LecturerDepartmentsController{
    create(obj)
    {
        if (typeof(obj.departmentID) != 'string' || obj.departmentID.length < 2) {
            return { error: 'Invalid Department' };
        }
        else if (typeof(obj.lecturerID) != 'string' || obj.lecturerID.length < 2) {
            return { error: 'Invalid Lecturer' };
        }
        lecturerdepartments.create(obj);
    }
    update(existObj, updatedObj)
    {
        if (updatedObj.length < 1) {
            return { error: 'Empty objects not allowed' };
        }
        lecturerdepartments.update(existObj, updatedObj);
    }
    find(obj)
    {
        return lecturerdepartments.find(obj);
    }
    delete(obj)
    {
        lecturerdepartments.delete(obj);
    }
}
exports.lecturerDepartmentController = new LecturerDepartmentsController();