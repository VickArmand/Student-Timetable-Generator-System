const courseController = require('./Controllers/coursesController').courseController;
const departmentController = require('./Controllers/departmentsController').departmentController;
const lecturerDepartmentController = require('./Controllers/lecturerDepartmentsController').lecturerDepartmentController;
const lecturerController = require('./Controllers/lecturersController').lecturerController;
const lectureController = require('./Controllers/lecturesController').lectureController;
const schoolController = require('./Controllers/schoolsController').schoolController;
const venueController = require('./Controllers/venuesController').venueController


const http = require('http');
// const add = require('./locations').add;
http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end("Hello World!");
}).listen(3000, ()=>{
    console.log("Server started");
    // course.create({name: "Computer Science"});
    // course.read();
    // course.find({name: "Computer Science"});
    async function find() {
        let record = await courseController.find({_id: '6614179e072398969b5eb672'});
        console.log(record);
        record = await venueController.find({venueName: "MPH"});
        console.log("record",record);
    };
    find();
    // course.update('6614179e072398969b5eb672', {name: 'Actuarial Science'});
    // course.delete('6614178879705bbb4e877a6d');
    // console.log(course.find({name: "Computer Science"}));
});