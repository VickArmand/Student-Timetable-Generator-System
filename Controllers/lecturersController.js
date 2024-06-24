const lecturer = require('../Models/lecturers').lecturer;

class LecturersController{
    create(req, res)
    {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        if (typeof(firstName) != 'string' || firstName.length < 4) {
            return res.status(400).end({ error: 'Invalid FirstName' });
        }
        else if (typeof(lastName) != 'string' || lastName.length < 4) {
            return res.status(400).end({ error: 'Invalid LastName' });
        }
        return res.status(201).end(lecturer.create({firstName, lastName}));
    }
    update(existObj, updatedObj)
    {
        if (updatedObj.length < 1) {
            return { error: 'Empty objects not allowed' };
        }
        return lecturer.update(existObj, updatedObj);
    }
    find(obj)
    {
        return lecturer.find(obj);
    }
    delete(obj)
    {
        return lecturer.delete(obj);
    }
}
exports.lecturerController = new LecturersController()