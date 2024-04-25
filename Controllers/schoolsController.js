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
        venue.update(existObj, updatedObj);
    }
    find(obj)
    {
        return venue.find(obj);
    }
    delete(obj)
    {
        venue.delete(obj);
    }
}
exports.schoolController = new SchoolsController()