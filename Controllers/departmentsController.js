const department = require('../Models/departments').department;

class DepartmentsController{
    create(departmentName, schoolID)
    {
        if (typeof(departmentName) != 'string' || departmentName.length < 2) {
            throw TypeError('Invalid Department');
        }
        else if (typeof(schoolID) != 'string' || schoolID.length < 2) {
            throw TypeError('Invalid School');
        }
        const obj = {departmentName: departmentName, schoolID: schoolID}; 
        department.create(obj);
    }
    update(id, obj)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        }
        else if (obj.length == 0) throw Error("Empty objects not allowed");
        department.update(id, obj);
    }
    find(obj)
    {
        department.find(obj);
    }
    delete(id)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        } 
        department.delete(id);
    }
}
exports.departmentController = new DepartmentsController();