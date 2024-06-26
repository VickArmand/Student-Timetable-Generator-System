const lecture = require('../Models/lectures').lecture;

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
        else if(!lecturerID || lecturerID.length < 4){
            return res.status(400).json({ error: 'Invalid Lecturer' });
        }
        else if (!courseID || courseID.length < 2) {
            return res.status(400).json({ error: 'Invalid Course' });
        }
        else if (!departmentID || departmentID.length < 2) {
            return res.status(400).json({ error: 'Invalid Department' });
        }
        else if (!schoolID || schoolID.length < 2) {
            return res.status(400).json({ error: 'Invalid School' });
        }
        else if (!venueID || venueID.length < 2) {
            return res.status(400).json({ error: 'Invalid Venue' });
        }
        return res.status(201).json(await lecture.create({
            schoolID, departmentID, 
            venueID, courseID, lecturerID,
            startTime, endTime}));
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
exports.lectureController = new LecturesController()