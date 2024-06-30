const express = require('express');
const authMiddleware = require('./Models/authMiddleware');
const {courseController} = require('./Controllers/coursesController');
const {departmentController} = require('./Controllers/departmentsController');
const {lecturerDepartmentController} = require('./Controllers/lecturerDepartmentsController');
const {lecturerController} = require('./Controllers/lecturersController');
const {lectureController} = require('./Controllers/lecturesController');
const {schoolController} = require('./Controllers/schoolsController');
const {venueController} = require('./Controllers/venuesController');
const { staticlectureController } = require('./Controllers/staticlecturesController');
const { unitController } = require('./Controllers/unitsController');
const { unitCourseController } = require('./Controllers/unitCoursesController');
const { examController } = require('./Controllers/examsController');
const { userController } = require('./Controllers/userController');
const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.use(authMiddleware);
router.delete('/logout', userController.logout);

router.post('/schools/add', schoolController.create);
router.post('/venues/add', venueController.create);
router.post('/courses/add', courseController.create);
router.post('/lecturerdepartments/add', lecturerDepartmentController.create);
router.post('/departments/add', departmentController.create);
router.post('/lecturers/add', lecturerController.create);
router.post('/lectures/add', lectureController.create);
router.post('/units/add', unitController.create);
router.post('/unitcourses/add', unitCourseController.create);
router.post('/exams/add', examController.create);
router.post('/staticlectures/add', staticlectureController.create);

router.get('/schools', schoolController.find);
router.get('/venues', venueController.find);
router.get('/courses', courseController.find);
router.get('/lecturerdepartments', lecturerDepartmentController.find);
router.get('/departments', departmentController.find);
router.get('/lecturers', lecturerController.find);
router.get('/lectures', lectureController.find);
router.get('/lectures/fetch', lectureController.fetch);
router.get('/units', unitController.find);
router.get('/unitcourses', unitCourseController.find);
router.get('/exams', examController.find);
router.get('/exams/fetch', examController.fetch);
router.get('/staticlectures', staticlectureController.find);
router.get('/staticlectures/fetch', staticlectureController.fetch);


router.put('/schools/edit/:id', schoolController.update);
router.put('/venues/edit/:id', venueController.update);
router.put('/courses/edit/:id', courseController.update);
router.put('/lecturerdepartments/edit/:id', lecturerDepartmentController.update);
router.put('/departments/edit/:id', departmentController.update);
router.put('/lecturers/edit/:id', lecturerController.update);
router.put('/lectures/edit/:id', lectureController.update);
router.put('/units/edit/:id', unitController.update);
router.put('/unitcourses/edit/:id', unitCourseController.update);
router.put('/exams/edit/:id', examController.update);
router.put('/staticlectures/edit/:id', staticlectureController.update);

router.delete('/schools/delete/:id', schoolController.delete);
router.delete('/venues/delete/:id', venueController.delete);
router.delete('/courses/delete/:id', courseController.delete);
router.delete('/lecturerdepartments/delete/:id', lecturerDepartmentController.delete);
router.delete('/departments/delete/:id', departmentController.delete);
router.delete('/lecturers/delete/:id', lecturerController.delete);
router.delete('/lectures/delete/:id', lectureController.delete);
router.delete('/units/delete/:id', unitController.delete);
router.delete('/unitcourses/delete/:id', unitCourseController.delete);
router.delete('/exams/delete/:id', examController.delete);
router.delete('/staticlectures/delete/:id', staticlectureController.delete);

module.exports = router;