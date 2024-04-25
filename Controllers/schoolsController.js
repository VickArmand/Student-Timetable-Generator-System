const school = require('../Models/schools').school;

class SchoolsController{
    create(obj)
    {
        if (typeof(obj.schoolName) != 'string' || obj.schoolName.length < 2) {
            return { error: 'Invalid Name' };
        }
        school.create(obj);
    }
    update(existObj, updatedObj)
    {
        if (updatedObj.length < 1) {
            return { error: 'Empty objects not allowed' };
        }
        school.update(existObj, updatedObj);
    }
    find(obj)
    {
        return school.find(obj);
    }
    delete(obj)
    {
        school.delete(obj);
    }
}
exports.schoolController = new SchoolsController()