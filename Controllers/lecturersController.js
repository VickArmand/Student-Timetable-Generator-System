const lecturer = require('../Models/lecturers').lecturer;

class LecturersController{
    async create(req, res)
    {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        if (!firstName|| firstName.length < 4) {
            return res.status(400).json({ error: 'Invalid FirstName' });
        }
        else if (!lastName || lastName.length < 4) {
            return res.status(400).json({ error: 'Invalid LastName' });
        }
        return res.status(201).json(await lecturer.create({firstName, lastName}));
    }
    async update(req, res)
    {
        const _id = req.params.id;
        const updatedObj = req.body;
        const firstName = updatedObj.firstName;
        const lastName = updatedObj.lastName;

        if (!_id)
            return res.status(400).json({ error: 'Id required' });
        if (Object.keys(updatedObj).length < 1)
            return res.status(400).json({ error: 'Empty objects not allowed' });
        const nameResult = await lecturer.find({firstName, lastName});
        if ((firstName && lastName) && nameResult.error)
            return res.status(400).json({ error: 'Lecturer available' });
        const result = await lecturer.update({_id}, updatedObj);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async find(req, res)
    {
        const result = await lecturer.find(req.query);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async delete(req, res)
    {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({error: 'Id required'});
        const result = await lecturer.delete({_id: id});
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
}
exports.lecturerController = new LecturersController()