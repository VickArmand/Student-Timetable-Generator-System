const venue = require('../Models/venues').venue;

class VenuesController{
    create(obj)
    {
        if (typeof(obj.venueName) != 'string' || obj.venueName.length < 2) {
            throw TypeError('Invalid Venue');
        }
        venue.create(obj);
    }
    update(existObj, updatedObj)
    {
        if (updatedObj.length < 1) {
            throw Error('Empty objects not allowed');
        }
        venue.update(existObj, updatedObj);
    }
    find(obj)
    {
        if (obj.length == 0) return venue.read();
        return venue.find(obj);
    }
    delete(obj)
    {
        venue.delete(obj);
    }
}
exports.venueController = new VenuesController()