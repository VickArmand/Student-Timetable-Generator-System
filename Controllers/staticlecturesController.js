const { unitCourse } = require('../Models/unit_has_course');
const staticlecture = require('../Models/staticlectures').staticlecture;
const venue = require('../Models/venues').venue;
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class StaticLecturesController{
    async create(req, res)
    {
        const unitCourseID = req.body.unitCourseID;
        const venueID = req.body.venueID;
        const day = req.body.day;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;

        if (!((startTime instanceof Date) && (endTime instanceof Date)))
            return res.status(400).json({ error: 'Invalid timestamps' });
        else if(!unitCourseID)
            return res.status(400).json({ error: 'Invalid unitCourse' });
        else if(!venueID)
            return res.status(400).json({ error: 'Invalid venue' });
        else if(!day || !DAYS.includes(day))
            return res.status(400).json({ error: 'Invalid Day' });
        const unitCourseResult = await unitCourse.find({_id: unitCourseID});
        if (unitCourseResult.error)
            return res.status(400).json({error: 'unitCourse not available' });
        const venueResult = await venue.find({_id: venueID});
        if (venueResult.error)
            return res.status(400).json({error: 'Venue not available' });
        const validateEvent = await staticlecture.find({day, startTime, endTime, venue});
        const validateSession = await staticlecture.find({unitCourseID, day, startTime, endTime});
        if (Object.keys(validateEvent).length > 0 || Object.keys(validateSession).length > 0)
            return res.status(400).json({error: 'Select a different time or venue to host your lecture' });
        return res.status(201).json(await staticlecture.create({unitCourseID, venueID, day, startTime, endTime}));
    }
    async update(req, res)
    {
        const _id = req.params.id;
        const updatedObj = req.body;
        const venueID = updatedObj.venueID;
        const startTime = updatedObj.startTime;
        const day = updatedObj.day;
        const endTime = updatedObj.endTime;
        const unitCourseID = updatedObj.unitCourseID;

        if (!_id)
            return res.status(400).json({ error: 'Id required' });
        if (Object.keys(updatedObj).length < 1)
            return res.status(400).json({ error: 'Empty objects not allowed' });
        if (!((startTime instanceof Date) && (endTime instanceof Date)))
            return res.status(400).json({ error: 'Invalid timestamps' });
        const venueResult = await venue.find({_id: venueID});
        if (venueID && venueResult.error)
            return res.status(400).json({error: 'Venue not available' });
        if(!day || !DAYS.includes(day))
            return res.status(400).json({ error: 'Invalid Day' });
        const unitCourseResult = await unitCourse.find({_id: unitCourseID});
        if (unitCourseID && unitCourseResult.error)
            return res.status(400).json({error: 'unitCourse not available' });
        const validateEvent = await staticlecture.find({day, startTime, endTime, venue});
        const validateSession = await staticlecture.find({unitCourseID, day, startTime, endTime});
        if (Object.keys(validateEvent).length > 0 || Object.keys(validateSession).length > 0)
            return res.status(400).json({error: 'Select a different time or venue to host your lecture' });
        const result = await staticlecture.update({_id}, updatedObj);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async find(req, res)
    {
        const result = await staticlecture.find(req.query);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async delete(req, res)
    {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({error: 'Id required'});
        const result = await staticlecture.delete({_id: id});
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
}
exports.staticlectureController = new StaticLecturesController()