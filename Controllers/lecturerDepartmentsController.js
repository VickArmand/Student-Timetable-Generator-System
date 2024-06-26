const lecturerdepartments = require('../Models/lecturer_has_departments').LecturerDepartment;
const lecturer = require('../Models/lecturers').lecturer;
const department = require('../Models/departments').department;

class LecturerDepartmentsController{
    async create(req, res)
    {
        const lecturerID = req.body.lecturerID;
        const departmentID = req.body.departmentID;

        if (!departmentID)
            return res.status(400).json({ error: 'Invalid Department' });
        else if (!lecturerID)
            return res.status(400).json({ error: 'Invalid Lecturer' });
        const lecturerResult = await lecturer.find({_id: lecturerID});
        if (lecturerResult.error)
            return res.status(400).json({error: 'Lecturer not available' });
        const departmentResult = await department.find({_id: departmentID});
        if (departmentResult.error)
            return res.status(400).json({error: 'Department not available' });
        return res.status(201).json(await lecturerdepartments.create({departmentID, lecturerID}));
    }
    async update(req, res)
    {
        const _id = req.params.id;
        const updatedObj = req.body;
        const lecturerID = updatedObj.lecturerID;
        const departmentID = updatedObj.departmentID;

        if (!_id)
            return res.status(400).json({ error: 'Id required' });
        if (Object.keys(updatedObj).length < 1)
            return res.status(400).json({ error: 'Empty objects not allowed' });
        const lecturerResult = await lecturer.find({_id: lecturerID});
        if (lecturerID && lecturerResult.error)
            return res.status(400).json({error: 'Lecturer not available' });
        const departmentResult = await department.find({_id: departmentID});
        if (departmentID && departmentResult.error)
            return res.status(400).json({error: 'Department not available' });
        const result = await lecturerdepartments.update({_id}, updatedObj);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async find(req, res)
    {
        const result = await lecturerdepartments.find(req.query);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async delete(req, res)
    {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({error: 'Id required'});
        const result = await lecturerdepartments.delete({_id: id});
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
}
exports.lecturerDepartmentController = new LecturerDepartmentsController();