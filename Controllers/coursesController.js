const course = require('../Models/courses').course;

class CoursesController{
    async create(req, res)
    {
        const years = Number(req.body.years);
        const semesters = Number(req.body.semesters);
        const departmentID = req.body.departmentID;
        const schoolID = req.body.schoolID;
        const courseName = req.body.courseName;

        if (!years || typeof(years) !== 'number' || years < 1){
            return res.status(400).json({ error: 'Invalid years' });
        }
        else if(!semesters || typeof(semesters) !== 'number' || semesters < 1){
            return res.status(400).json({error: 'Invalid semesters' });
        }
        else if (!courseName || courseName.length < 2) {
            return res.status(400).json({error: 'Invalid Course' });
        }
        else if (!departmentID || departmentID.length < 2) {
            return res.status(400).json({error: 'Invalid Department' });
        }
        else if (!schoolID || schoolID.length < 2) {
            return res.status(400).json({error: 'Invalid School' });
        }
        return res.status(201).json(await course.create({schoolID, courseName,
            departmentID, years, semesters}));
    }
    async update(req, res)
    {
        const _id = req.params.id;
        const updatedObj = req.body;
        if (!_id)
            return res.status(400).json({ error: 'Id required' });
        if (Object.keys(updatedObj).length < 1)
            return res.status(400).json({ error: 'Empty objects not allowed' });
        const result = await school.update({_id}, updatedObj);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async find(req, res)
    {
        const result = await school.find(req.query);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async delete(req, res)
    {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({error: 'Id required'});
        const result = await school.delete({_id: id});
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
}
exports.courseController = new CoursesController();