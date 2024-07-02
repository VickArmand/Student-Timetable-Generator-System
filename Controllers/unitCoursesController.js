const unitCourse = require('../Models/unit_has_course.js').unitCourse;
const lecturer = require('../Models/lecturers.js').lecturer;
const course = require('../Models/courses.js').course;
const unit = require('../Models/units.js').unit;

class UnitCoursesController{
    async create(req, res)
    {
        const unitID = req.body.unitID;
        const lecturerID = req.body.lecturerID;
        const courseID = req.body.courseID;
        const year = Number(req.body.year);
        const semester = Number(req.body.semester);

        if(!lecturerID)
            return res.status(400).json({ error: 'Invalid Lecturer' });
        else if (!courseID)
            return res.status(400).json({ error: 'Invalid Course' });
        else if (!unitID)
            return res.status(400).json({ error: 'Invalid Unit' });
        else if (!year || typeof(year) !== 'number' || year < 1)
            return res.status(400).json({ error: 'Invalid year' });
        else if (!semester || typeof(semester) !== 'number' || semester < 1)
            return res.status(400).json({ error: 'Invalid semester' });
        const lecturerResult = await lecturer.find({_id: lecturerID});
        if (lecturerResult.error)
            return res.status(400).json({error: 'Lecturer not available' });
        const courseResult = await course.find({_id: courseID});
        if (courseResult.error)
            return res.status(400).json({error: 'Course not available' });
        const unitResult = await unit.find({_id: unitID});
        if (unitResult.error)
            return res.status(400).json({error: 'Unit not available' });
        else if (year > courseResult.years)
            return res.status(400).json({ error: 'Invalid year' });
        else if (semester > courseResult.semesters)
            return res.status(400).json({ error: 'Invalid semester' });
        const unitCourseresult = await unitCourse.find({unitID, courseID, lecturerID});
        const courseUnitResult = await unitCourse.find({unitID, courseID});
        if (unitCourseresult.error && courseUnitResult.error)
            return res.status(201).json(await unitCourse.create({unitID, courseID, lecturerID, year, semester}));
        return res.status(201).json({error: "unitCourse exists"});
    }
    async update(req, res)
    {
        const _id = req.params.id;
        const updatedObj = req.body;
        const lecturerID = updatedObj.lecturerID;
        const courseID = updatedObj.courseID;
        const unitID = updatedObj.unitID;
        const year = Number(updatedObj.year);
        const semester = Number(updatedObj.semester);

        if (!_id)
            return res.status(400).json({ error: 'Id required' });
        else if (Object.keys(updatedObj).length < 1)
            return res.status(400).json({ error: 'Empty objects not allowed' });
        const lecturerResult = await lecturer.find({_id: lecturerID});
        if (lecturerID && lecturerResult.error)
            return res.status(400).json({error: 'Lecturer not available' });
        const courseResult = await course.find({_id: courseID});
        if (courseID && courseResult.error)
            return res.status(400).json({error: 'Course not available' });
        const unitResult = await unit.find({_id: unitID});
        if (unitID && unitResult.error)
            return res.status(400).json({error: 'Unit not available' });
        else if (year && (typeof(year) !== 'number' || year < 1 || year > courseResult.years))
            return res.status(400).json({ error: 'Invalid year' });
        else if (semester && (typeof(semester) !== 'number' || semester < 1 || semester > courseResult.semesters))
            return res.status(400).json({ error: 'Invalid semester' });
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