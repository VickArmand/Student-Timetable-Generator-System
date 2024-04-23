const school = require('../Models/schools').school;

class SchoolsController{
    create(obj)
    {
        if (typeof(obj.schoolName) != 'string' || obj.schoolName.length < 2) {
            throw TypeError('Invalid Name');
        }
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
        if (obj.length == 0) return school.read();
        return school.find(obj);
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