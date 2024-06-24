const school = require('../Models/schools').school;

class SchoolsController{
    create(req, res)
    {
        const schoolName = req.body.schoolName;

        if (typeof(schoolName) != 'string' || schoolName.length < 2) {
            return res.status(400).end({ error: 'Invalid Name' });
        }
        return res.status(201).end(school.create({schoolName}));
    }
    update(existObj, updatedObj)
    {
        if (updatedObj.length < 1) {
            return { error: 'Empty objects not allowed' };
        }
        return school.update(existObj, updatedObj);
    }
    find(obj)
    {
        return school.find(obj);
    }
    delete(obj)
    {
        return school.delete(obj);
    }
}
exports.schoolController = new SchoolsController()