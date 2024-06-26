const express = require('express');
const { staticlectureController } = require('./Controllers/staticlecturesController');
const courseController = require('./Controllers/coursesController').courseController;
const departmentController = require('./Controllers/departmentsController').departmentController;
const lecturerDepartmentController = require('./Controllers/lecturerDepartmentsController').lecturerDepartmentController;
const lecturerController = require('./Controllers/lecturersController').lecturerController;
const lectureController = require('./Controllers/lecturesController').lectureController;
const schoolController = require('./Controllers/schoolsController').schoolController;
const venueController = require('./Controllers/venuesController').venueController;

const router = express.Router();
router.post('/schools/add', schoolController.create);
router.post('/venues/add', venueController.create);
router.post('/courses/add', courseController.create);
router.post('/lecturerdepartments/add', lecturerDepartmentController.create);
router.post('/departments/add', departmentController.create);
router.post('/lecturers/add', lecturerController.create);
router.post('/lectures/add', lectureController.create);
router.post('/staticlectures/add', staticlectureController.create);

router.get('/schools', schoolController.find);
router.get('/venues', venueController.find);
router.get('/courses', courseController.find);
router.get('/lecturerdepartments', lecturerDepartmentController.find);
router.get('/departments', departmentController.find);
router.get('/lecturers', lecturerController.find);
router.get('/lectures', lectureController.find);
router.get('/staticlectures', staticlectureController.find);

router.put('/schools/edit/:id', schoolController.update);
router.put('/venues/edit/:id', venueController.update);
router.put('/courses/edit/:id', courseController.update);
router.put('/lecturerdepartments/edit/:id', lecturerDepartmentController.update);
router.put('/departments/edit/:id', departmentController.update);
router.put('/lecturers/edit/:id', lecturerController.update);
router.put('/lectures/edit/:id', lectureController.update);
router.put('/staticlectures/edit/:id', staticlectureController.update);

router.delete('/schools/delete/:id', schoolController.delete);
router.delete('/venues/delete/:id', venueController.delete);
router.delete('/courses/delete/:id', courseController.delete);
router.delete('/lecturerdepartments/delete/:id', lecturerDepartmentController.delete);
router.delete('/departments/delete/:id', departmentController.delete);
router.delete('/lecturers/delete/:id', lecturerController.delete);
router.delete('/lectures/delete/:id', lectureController.delete);
router.delete('/staticlectures/delete/:id', staticlectureController.delete);

module.exports = router;