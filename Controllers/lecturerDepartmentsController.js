const lecturerdepartments = require('../Models/lecturer_has_departments').LecturerDepartment;

class LecturerDepartmentsController{
    async create(req, res)
    {
        const lecturerID = req.body.lecturerID;
        const departmentID = req.body.departmentID;

        if (!departmentID || departmentID.length < 2) {
            return res.status(400).json({ error: 'Invalid Department' });
        }
        else if (!lecturerID || lecturerID.length < 2) {
            return res.status(400).json({ error: 'Invalid Lecturer' });
        }
        return res.status(201).json(await lecturerdepartments.create({departmentID, lecturerID}));
    }
    async update(req, res)
    {
        const _id = req.params.id;
        const updatedObj = req.body;
        if (!_id)
            return res.status(400).json({ error: 'Id required' });
        if (Object.keys(updatedObj).length < 1)
            return res.status(400).json({ error: 'Empty objects not allowed' });
        const result = await venue.update({_id}, updatedObj);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async find(req, res)
    {
        const result = await venue.find(req.query);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async delete(req, res)
    {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({error: 'Id required'});
        const result = await venue.delete({_id: id});
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
}
exports.lecturerDepartmentController = new LecturerDepartmentsController();