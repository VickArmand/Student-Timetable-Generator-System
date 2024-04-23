const lecturer = require('../Models/lecturers').lecturer;

class LecturersController{
    create(obj)
    {
        if (typeof(obj.firstName) != 'string' || obj.firstName.length < 4) {
            throw TypeError('Invalid FirstName');
        }
        else if (typeof(obj.lastName) != 'string' || obj.lastName.length < 4) {
            throw TypeError('Invalid LastName');
        }
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
    async find(obj)
    {
        if (obj.length == 0) return await lecturer.read();
        return await lecturer.find(obj);
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