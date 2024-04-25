const department = require('../Models/departments').department;

class DepartmentsController{
    create(obj)
    {
        if (typeof(obj.departmentName) != 'string' || obj.departmentName.length < 2) {
            return { error: 'Invalid Department' };
        }
        else if (typeof(obj.schoolID) != 'string' || obj.schoolID.length < 2) {
            return { error: 'Invalid School' };
        }
        return department.create(obj);
    }
    update(existObj, updatedObj)
    {
        if (updatedObj.length < 1) {
            return { error: 'Empty objects not allowed' };
        }
        return department.update(existObj, updatedObj);
    }
    find(obj)
    {
        return department.find(obj);
    }
    delete(obj)
    {
        return department.delete(obj);
    }
}
exports.departmentController = new DepartmentsController();