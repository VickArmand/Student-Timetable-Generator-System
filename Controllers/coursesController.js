const course = require('../Models/courses').course;

class CoursesController{
    create(req, res)
    {
        const years = parseInt(req.body.years);
        const semesters = parseInt(req.body.semesters);
        const departmentID = req.body.departmentID;
        const schoolID = req.body.schoolID;
        const courseName = req.body.courseName;

        if (typeof(years) !== 'number' || years < 1){
            return res.status(400).json({ error: 'Invalid years' });
        }
        else if(typeof(semesters) !== 'number' || semesters < 1){
            return res.status(400).json({error: 'Invalid semesters' });
        }
        else if (typeof(courseName) != 'string' || courseName.length < 2) {
            return res.status(400).json({error: 'Invalid Course' });
        }
        else if (typeof(departmentID) != 'string' || departmentID.length < 2) {
            return res.status(400).json({error: 'Invalid Department' });
        }
        else if (typeof(schoolID) != 'string' || schoolID.length < 2) {
            return res.status(400).json({error: 'Invalid School' });
        }
        return res.status(201).json(course.create({schoolID, courseName, departmentID, years, semesters}));
    }
    update(existObj, updatedObj)
    {
        if (updatedObj.length < 1) {
            return { error: 'Empty objects not allowed' };
        }
        return course.update(existObj, updatedObj);
    }
    find(obj)
    {
        return course.find(obj);
    }
    delete(obj)
    {
        return course.delete(obj);
    }
}
exports.courseController = new CoursesController();