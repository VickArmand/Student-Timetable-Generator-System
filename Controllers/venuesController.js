const venue = require('../Models/unit_has_course.js').venue;

class venuesController{
    async create(req, res)
    {
        const venueName = req.body.venueName;

        if (!venueName) {
            return res.status(400).json({ error: 'Invalid Venue' });
        }
        const result = await venue.create({venueName});
        if (result.error)
            return res.status(400).json(result);
        return res.status(201).json(result);
    }
    async update(req, res)
    {
        const _id = req.params.id;
        const updatedObj = req.body;
        if (!_id)
            return res.status(400).json({ error: 'Id required' });
        if (Object.keys(updatedObj).length < 1)
            return res.status(400).json({ error: 'Empty objects not allowed' });
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
exports.venueController = new venuesController()