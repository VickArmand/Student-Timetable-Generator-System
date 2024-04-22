const lecturer = require('../Models/lecturers').lecturer;

class LecturersController{
    create(firstName, lastName)
    {
        if (typeof(firstName) != 'string' || firstName.length < 4) {
            throw TypeError('Invalid FirstName');
        }
        else if (typeof(lastName) != 'string' || lastName.length < 4) {
            throw TypeError('Invalid LastName');
        }
        const obj = {firstName: firstName, lastName: lastName}; 
        lecturer.create(obj);
    }
    update(id, obj)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        }
        else if (obj.length == 0) throw Error("Empty objects not allowed");
        lecturer.update(id, obj);
    }
    find(obj)
    {
        lecturer.find(obj);
    }
    delete(id)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        } 
        lecturer.delete(id);
    }
}
exports.lecturerController = new LecturersController()