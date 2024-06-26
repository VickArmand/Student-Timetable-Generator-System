const { unitCourse } = require('../Models/unit_has_course');
const venue = require('../Models/venues').venue;
const exam = require('../Models/exams').exam;

class ExamsController{
    async create(req, res)
    {
        const unitCourseID = req.body.unitCourseID;
        const venueID = req.body.venueID;
        const start = req.body.startDateTime;
        const end = req.body.endDateTime;

        if (!start || !end )
            return res.status(400).json({ error: 'Invalid timestamps' });
        else if(!unitCourseID)
            return res.status(400).json({ error: 'Invalid unitCourse' });
        else if(!venueID)
            return res.status(400).json({ error: 'Invalid venue' });
        const startDateTime = new Date(start);
        const endDateTime = new Date(end);
        if (startDateTime.toString() === "Invalid Date" || endDateTime.toString() === "Invalid Date" ||
         startDateTime.getTime() > endDateTime.getTime())
            return res.status(400).json({ error: 'Invalid timestamps' });
        const unitCourseResult = await unitCourse.find({_id: unitCourseID});
        if (unitCourseResult.error)
            return res.status(400).json({error: 'unitCourse not available' });
        const venueResult = await venue.find({_id: venueID});
        if (venueResult.error)
            return res.status(400).json({error: 'Venue not available' });
        const validateEvent = await lecture.find({startTime, endTime, venue});
        const validateSession = await lecture.find({unitCourseID, startTime, endTime});
        if (Object.keys(validateEvent).length > 0 || Object.keys(validateSession).length > 0)
            return res.status(400).json({error: 'Select a different time or venue to host your lecture' });
        return res.status(201).json(await lecture.create({unitCourseID, venueID, startTime, endTime}));
    }
    async update(req, res)
    {
        const _id = req.params.id;
        const updatedObj = req.body;
        const unitCourseID = updatedObj.unitCourseID;
        const venueID = updatedObj.venueID;
        const start = updatedObj.startDateTime;
        const end = updatedObj.endDateTime;
        const startDateTime = new Date(start);
        const endDateTime = new Date(end);
        if (!_id)
            return res.status(400).json({ error: 'Id required' });
        else if (Object.keys(updatedObj).length < 1)
            return res.status(400).json({ error: 'Empty objects not allowed' });
        else if ((start && startDateTime.toString() === "Invalid Date") || (end && endDateTime.toString() === "Invalid Date"))
            return res.status(400).json({ error: 'Invalid timestamps' });
        else if ((start && end) && startDateTime.getTime() > endDateTime.getTime())
            return res.status(400).json({ error: 'Invalid timestamps' });
        const unitCourseResult = await unitCourse.find({_id: unitCourseID});
        if (unitCourseID && unitCourseResult.error)
            return res.status(400).json({error: 'unitCourse not available' });
        const venueResult = await venue.find({_id: venueID});
        if (venueID && venueResult.error)
            return res.status(400).json({error: 'Venue not available' });
        const validateEvent = await lecture.find({startTime, endTime, venue});
        const validateSession = await lecture.find({unitCourseID, startTime, endTime});
        if (Object.keys(validateEvent).length > 0 || Object.keys(validateSession).length > 0)
            return res.status(400).json({error: 'Select a different time or venue to host your lecture' });
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