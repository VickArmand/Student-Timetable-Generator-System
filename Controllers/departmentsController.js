const department = require('../Models/departments').department;

class DepartmentsController{
    create(req, res)
    {
        const departmentName = req.body.departmentName;
        const schoolID = req.body.schoolID;
        if (typeof(departmentName) != 'string' || departmentName.length < 2) {
            return res.status(400).json({ error: 'Invalid Department' });
        }
        else if (typeof(schoolID) != 'string' || schoolID.length < 2) {
            return res.status(400).json({ error: 'Invalid School' });
        }
        return res.status(201).json(department.create({schoolID, departmentName}));
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