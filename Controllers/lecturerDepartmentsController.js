const lecturerdepartments = require('../Models/lecturer_has_departments').LecturerDepartment;

class LecturerDepartmentsController{
    create(req, res)
    {
        const lecturerID = req.body.lecturerID;
        const departmentID = req.body.departmentID;

        if (typeof(departmentID) != 'string' || departmentID.length < 2) {
            return res.status(400).json({ error: 'Invalid Department' });
        }
        else if (typeof(lecturerID) != 'string' || lecturerID.length < 2) {
            return res.status(400).json({ error: 'Invalid Lecturer' });
        }
        return res.status(201).json(lecturerdepartments.create({departmentID, lecturerID}));
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