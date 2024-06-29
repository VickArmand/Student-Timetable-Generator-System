const express = require('express');
const router = require('./routes');
const app = express();
const baseModel = require('./Models/baseModel');
// const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./Models/passportauth');
// const store = require('./Models/sessions');

app.use(express.json());
// Configure session middleware
// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {secure: true, maxAge: 30 * 60 * 1000}, // 30min
//     store: store
// }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
// app.use(passport.session());
app.use('/api', router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));