const express = require('express');
const router = require('./routes');
const app = express();
const baseModel = require('./Models/baseModel');
const bodyParser = require('body-parser');
const passport = require('passport');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use('/api', router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));