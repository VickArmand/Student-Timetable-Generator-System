const lecturer = require('../Models/lecturers').lecturer;

class LecturersController{
    create(obj)
    {
        if (typeof(obj.firstName) != 'string' || obj.firstName.length < 4) {
            return { error: 'Invalid FirstName' };
        }
        else if (typeof(obj.lastName) != 'string' || obj.lastName.length < 4) {
            return { error: 'Invalid LastName' };
        }
        lecturer.create(obj);
    }
    update(existObj, updatedObj)
    {
        if (updatedObj.length < 1) {
            return { error: 'Empty objects not allowed' };
        }
        lecturer.update(existObj, updatedObj);
    }
    find(obj)
    {
        return lecturer.find(obj);
    }
    delete(obj)
    {
        lecturer.delete(obj);
    }
}
exports.lecturerController = new LecturersController()