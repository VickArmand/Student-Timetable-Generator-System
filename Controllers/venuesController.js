const venue = require('../Models/venues').venue;

class VenuesController{
    create(venueName)
    {
        if (typeof(venueName) != 'string' || venueName.length < 2) {
            throw TypeError('Invalid Venue');
        }
        const obj = {venueName: venueName}; 
        venue.create(obj);
    }
    update(id, obj)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        }
        else if (obj.length == 0) throw Error("Empty objects not allowed");
        venue.update(id, obj);
    }
    find(obj)
    {
        if (obj.length == 0) return venue.read();
        return venue.find(obj);
    }
    delete(id)
    {
        if (typeof(id) != 'string' || id.length < 2) {
            throw TypeError('Invalid ID');
        } 
        venue.delete(id);
    }
}
exports.venueController = new VenuesController()