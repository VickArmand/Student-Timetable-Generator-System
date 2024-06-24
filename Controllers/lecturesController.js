const lecture = require('../Models/lectures').lecture;

class LecturesController{
    create(req, res)
    {
        const schoolID = req.body.schoolID;
        const lecturerID = req.body.lecturerID;
        const departmentID = req.body.departmentID;
        const courseID = req.body.courseID;
        const venueID = req.body.venueID;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;

        if (!((startTime instanceof Date) && (endTime instanceof Date))){
            return res.status(400).end({ error: 'Invalid timestamps' });
        }
        else if(typeof(lecturerID) !== 'string' || lecturerID.length < 4){
            return res.status(400).end({ error: 'Invalid Lecturer' });
        }
        else if (typeof(courseID) != 'string' || courseID.length < 2) {
            return res.status(400).end({ error: 'Invalid Course' });
        }
        else if (typeof(departmentID) != 'string' || departmentID.length < 2) {
            return res.status(400).end({ error: 'Invalid Department' });
        }
        else if (typeof(schoolID) != 'string' || schoolID.length < 2) {
            return res.status(400).end({ error: 'Invalid School' });
        }
        else if (typeof(venueID) != 'string' || venueID.length < 2) {
            return res.status(400).end({ error: 'Invalid Venue' });
        }
        return res.status(201).end(lecture.create({
            schoolID, departmentID, 
            venueID, courseID, lecturerID,
            startTime, endTime}));
    }
    update(existObj, updatedObj)
    {
        if (updatedObj.length < 1) {
            return { error: 'Empty objects not allowed' };
        }
        return lecture.update(existObj, updatedObj);
    }
    find(obj)
    {
        return lecture.find(obj);
    }
    delete(obj)
    {
        return lecture.delete(obj);
    }
}
exports.lectureController = new LecturesController()