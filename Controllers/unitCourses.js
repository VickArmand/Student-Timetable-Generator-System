const unitCourse = require('../Models/unit_has_course.js').unitCourse;
const lecturer = require('../Models/lecturers').lecturer;
const department = require('../Models/departments').department;
const course = require('../Models/courses').course;
const school = require('../Models/schools').school;

class UnitCoursesController{
    async create(req, res)
    {
        const schoolID = req.body.schoolID;
        const lecturerID = req.body.lecturerID;
        const departmentID = req.body.departmentID;
        const courseID = req.body.courseID;

        if(!lecturerID)
            return res.status(400).json({ error: 'Invalid Lecturer' });
        else if (!courseID)
            return res.status(400).json({ error: 'Invalid Course' });
        else if (!departmentID)
            return res.status(400).json({ error: 'Invalid Department' });
        else if (!schoolID)
            return res.status(400).json({ error: 'Invalid School' });
        const schoolResult = await school.find({_id: schoolID});
        if (schoolResult.error)
            return res.status(400).json({error: 'School not available' });
        const departmentResult = await department.find({_id: departmentID});
        if (departmentResult.error)
            return res.status(400).json({error: 'Department not available' });
        const lecturerResult = await lecturer.find({_id: lecturerID});
        if (lecturerResult.error)
            return res.status(400).json({error: 'Lecturer not available' });
        const courseResult = await course.find({_id: courseID});
        if (courseResult.error)
            return res.status(400).json({error: 'Course not available' });
        return res.status(201).json(await unitCourse.create({departmentID, lecturerID}));
    }
    async update(req, res)
    {
        const _id = req.params.id;
        const updatedObj = req.body;
        const schoolID = updatedObj.schoolID;
        const lecturerID = updatedObj.lecturerID;
        const departmentID = updatedObj.departmentID;
        const courseID = updatedObj.courseID;

        if (!_id)
            return res.status(400).json({ error: 'Id required' });
        if (Object.keys(updatedObj).length < 1)
            return res.status(400).json({ error: 'Empty objects not allowed' });
        const schoolResult = await school.find({_id: schoolID});
        if (schoolID && schoolResult.error)
            return res.status(400).json({error: 'School not available' });
        const departmentResult = await department.find({_id: departmentID});
        if (departmentID && departmentResult.error)
            return res.status(400).json({error: 'Department not available' });
        const lecturerResult = await lecturer.find({_id: lecturerID});
        if (lecturerID && lecturerResult.error)
            return res.status(400).json({error: 'Lecturer not available' });
        const courseResult = await course.find({_id: courseID});
        if (courseID && courseResult.error)
            return res.status(400).json({error: 'Course not available' });
        const result = await unitCourse.update({_id}, updatedObj);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async find(req, res)
    {
        const result = await unitCourse.find(req.query);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async delete(req, res)
    {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({error: 'Id required'});
        const result = await unitCourse.delete({_id: id});
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
}
exports.unitCourseController = new UnitCoursesController();