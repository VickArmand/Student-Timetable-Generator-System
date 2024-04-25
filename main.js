const courseController = require('./Controllers/coursesController').courseController;
const departmentController = require('./Controllers/departmentsController').departmentController;
const lecturerDepartmentController = require('./Controllers/lecturerDepartmentsController').lecturerDepartmentController;
const lecturerController = require('./Controllers/lecturersController').lecturerController;
const lectureController = require('./Controllers/lecturesController').lectureController;
const schoolController = require('./Controllers/schoolsController').schoolController;
const venueController = require('./Controllers/venuesController').venueController
const views = require('./Views/views').views;

const http = require('http');
http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end("Hello World!");
}).listen(3000, ()=>{
    console.log("Server started");
    
    async function createVenues() {
        const venue = await views.create(venueController, {venueName: "Graduation Square"});
        console.log(venue);
    }
    createVenues()
    // views.create(courseController, {courseName: "Computer Science", years: 4, semesters: 2, departmentID: ,schoolID: });
    async function findVenues(obj) {
        console.log(await views.find(venueController, obj));
    }
    async function findCourse(obj) {
        console.log(await views.find(courseController, obj));
    }
    findCourse({});
    // findVenues({});
    // findVenues({venueName: "Graduation Square"})
    // views.update(venueController, {venueName: "Graduation Square"}, {Name: "GSquare"});
    // views.delete(venueController, {venueName: "Graduation Square"});
});