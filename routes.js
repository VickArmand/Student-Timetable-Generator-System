const express = require('express');
const { staticlectureController } = require('./Controllers/staticlecturesController');
const { unitController } = require('./Controllers/unitsController');
const { unitCourseController } = require('./Controllers/unitCoursesController');
const { examController } = require('./Controllers/examsController');
const { userController } = require('./Controllers/userController');
const passport = require('passport');
const token = require('./Models/tokens');
const jwtverify = require('./Models/jwtverify');
const courseController = require('./Controllers/coursesController').courseController;
const departmentController = require('./Controllers/departmentsController').departmentController;
const lecturerDepartmentController = require('./Controllers/lecturerDepartmentsController').lecturerDepartmentController;
const lecturerController = require('./Controllers/lecturersController').lecturerController;
const lectureController = require('./Controllers/lecturesController').lectureController;
const schoolController = require('./Controllers/schoolsController').schoolController;
const venueController = require('./Controllers/venuesController').venueController;
const router = express.Router();
router.post('/login', userController.login);
// router.post('/login', async(req, res, next) => {
//     const user = req.user
//     // const sessionID = req.sessionID;
//     if (user && req.isAuthenticated())
//         res.status(200).send({message: "Already Logged in"});
//     passport.authenticate('jwt', {session: false}, function(error, user, info){
//         console.log(info)
//         // if (info)
//         //     next(info)
//         if (user) {
//             console.log(user)
//             const accessToken = require('jsonwebtoken').sign({
//                 id: user._id,
//             }, process.env.SECRET,
//             {expiresIn: "1d"});
//             res.cookie('jwt', accessToken, {httpOnly: true, secure: true});
//             res.status(200).json({
//                 message: "User Logged In",
//                 accessToken
//             });
//         }
//         else
//             res.status(401).json(info);
//     })(req, res, next);
// });
router.post('/register', userController.register);
async function isAuthorizedMiddleWare(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.split(" ")[1])
        return res.status(401).json({error: "Unauthorized"});
    const accesstoken = authHeader.split(" ")[1]
    const result = jwtverify(accesstoken);
    const response = await token.find({token: accesstoken});
    console.log(response)
    if (result.error || response.error)
        return res.status(401).json({error: "Unauthorized"});
    req.user = result;
    req.session = result;
    req.sessionID = accesstoken;
    next();
}
router.use(isAuthorizedMiddleWare);
router.delete('/logout', async (req, res) => {
    console.log(req.user)
    console.log(req.session)
    const result = await token.delete({
        user_id: req.user.id,
        email: req.user.email,
        token: req.sessionID
    });
    console.log(result)
    console.log(new Date(Date.now()).getTime())
    delete req.session;
    delete req.user;
    delete req.sessionID;
    // req.session.destroy(() => {
    //     return res.status(201).json({message: "Logged out"});
    // });
    // console.log(req.sessionID);
    // console.log(req.isAuthenticated());
    // console.log(req.session);
    return res.status(201).json({message: "Logged out"});
});
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
router.get('/units', unitController.find);
router.get('/unitcourses', unitCourseController.find);
router.get('/exams', examController.find);
router.get('/staticlectures', staticlectureController.find);

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