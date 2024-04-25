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
        return lecturerdepartments.create(obj);
    }
    update(existObj, updatedObj)
    {
        if (updatedObj.length < 1) {
            return { error: 'Empty objects not allowed' };
        }
        return lecturerdepartments.update(existObj, updatedObj);
    }
    find(obj)
    {
        return lecturerdepartments.find(obj);
    }
    delete(obj)
    {
        return lecturerdepartments.delete(obj);
    }
}
exports.lecturerDepartmentController = new LecturerDepartmentsController();