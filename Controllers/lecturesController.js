const lecture = require('../Models/lectures').lecture;
const course = require('../Models/courses').course;
const school = require('../Models/schools').school;
const department = require('../Models/departments').department;
const venue = require('../Models/venues').venue;
const lecturer = require('../Models/lecturers').lecturer;

class LecturesController{
    async create(req, res)
    {
        const schoolID = req.body.schoolID;
        const lecturerID = req.body.lecturerID;
        const departmentID = req.body.departmentID;
        const courseID = req.body.courseID;
        const venueID = req.body.venueID;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;

        if (!((startTime instanceof Date) && (endTime instanceof Date))){
            return res.status(400).json({ error: 'Invalid timestamps' });
        }
        else if(!lecturerID)
            return res.status(400).json({ error: 'Invalid Lecturer' });
        else if (!courseID)
            return res.status(400).json({ error: 'Invalid Course' });
        else if (!departmentID)
            return res.status(400).json({ error: 'Invalid Department' });
        else if (!schoolID)
            return res.status(400).json({ error: 'Invalid School' });
        else if (!venueID)
            return res.status(400).json({ error: 'Invalid Venue' });
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
        const venueResult = await venue.find({_id: venueID});
        if (venueResult.error)
            return res.status(400).json({error: 'Venue not available' });
        return res.status(201).json(await lecture.create({
            schoolID, departmentID, 
            venueID, courseID, lecturerID,
            startTime, endTime}));
    }
    async update(req, res)
    {
        const _id = req.params.id;
        const updatedObj = req.body;
        const schoolID = updatedObj.schoolID;
        const lecturerID = updatedObj.lecturerID;
        const departmentID = updatedObj.departmentID;
        const courseID = updatedObj.courseID;
        const venueID = updatedObj.venueID;
        const startTime = updatedObj.startTime;
        const endTime = updatedObj.endTime;
        if (!_id)
            return res.status(400).json({ error: 'Id required' });
        if (Object.keys(updatedObj).length < 1)
            return res.status(400).json({ error: 'Empty objects not allowed' });
        if (!((startTime instanceof Date) && (endTime instanceof Date)))
            return res.status(400).json({ error: 'Invalid timestamps' });
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
        const venueResult = await venue.find({_id: venueID});
        if (venueID && venueResult.error)
            return res.status(400).json({error: 'Venue not available' });
        const result = await lecture.update({_id}, updatedObj);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async find(req, res)
    {
        const result = await lecture.find(req.query);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async delete(req, res)
    {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({error: 'Id required'});
        const result = await lecture.delete({_id: id});
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
}
exports.lectureController = new LecturesController()