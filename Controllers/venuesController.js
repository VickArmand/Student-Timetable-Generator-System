const venue = require('../Models/venues').venue;

class VenuesController{
    create(req, res)
    {
        const venueName = req.body.venueName;

        if (typeof(venueName) != 'string' || venueName.length < 2) {
            return res.status(400).end({ error: 'Invalid Venue' });
        }
        return res.status(201).end(venue.create({venueName}));
    }
    update(existObj, updatedObj)
    {
        if (updatedObj.length < 1) {
            return { error: 'Empty objects not allowed' };
        }
        return venue.update(existObj, updatedObj);
    }
    find(obj)
    {
        return venue.find(obj);
    }
    delete(obj)
    {
        return venue.delete(obj);
    }
}
exports.venueController = new VenuesController()