const department = require('../Models/departments').department;
const school = require('../Models/schools').school;

class DepartmentsController{
    async create(req, res)
    {
        const departmentName = req.body.departmentName;
        const schoolID = req.body.schoolID;
        if (!departmentName || departmentName.length < 2)
            return res.status(400).json({ error: 'Invalid Department' });
        else if (!schoolID)
            return res.status(400).json({ error: 'Invalid School' });
        const schoolResult = await school.find({_id: schoolID});
        if (schoolResult.error)
            return res.status(400).json({error: 'School not available' });
        return res.status(201).json(await department.create({schoolID, departmentName}));
    }
    async update(req, res)
    {
        const _id = req.params.id;
        const updatedObj = req.body;
        const schoolID = updatedObj.schoolID;

        if (!_id)
            return res.status(400).json({ error: 'Id required' });
        if (Object.keys(updatedObj).length < 1)
            return res.status(400).json({ error: 'Empty objects not allowed' });
        const schoolResult = await school.find({_id: schoolID});
        if (schoolID && schoolResult.error)
            return res.status(400).json({error: 'School not available' });
        const result = await department.update({_id}, updatedObj);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async find(req, res)
    {
        const result = await department.find(req.query);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async delete(req, res)
    {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({error: 'Id required'});
        const result = await department.delete({_id: id});
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
}
exports.departmentController = new DepartmentsController();