const venue = require('../Models/venues').venue;

class VenuesController{
    create(obj)
    {
        if (typeof(obj.venueName) != 'string' || obj.venueName.length < 2) {
            return { error: 'Invalid Venue' };
        }
        return venue.create(obj);
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