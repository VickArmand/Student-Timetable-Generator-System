const department = require('../Models/departments').department;

class DepartmentsController{
    create(obj)
    {
        if (typeof(obj.departmentName) != 'string' || obj.departmentName.length < 2) {
            throw TypeError('Invalid Department');
        }
        else if (typeof(obj.schoolID) != 'string' || obj.schoolID.length < 2) {
            throw TypeError('Invalid School');
        }
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
    async find(obj)
    {
        if (obj.length == 0) return await department.read();
        return await department.find(obj);
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