const school = require('../Models/schools').school;

class SchoolsController{
    create(schoolName)
    {
        if (typeof(schoolName) != 'string' || schoolName.length < 2) {
            throw TypeError('Invalid Name');
        }
        const obj = {schoolName: schoolName}; 
        school.create(obj);
    }
    update(id, obj)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        }
        else if (obj.length == 0) throw Error("Empty objects not allowed");
        school.update(id, obj);
    }
    find(obj)
    {
        school.find(obj);
    }
    delete(id)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        } 
        school.delete(id);
    }
}
exports.schoolController = new SchoolsController()