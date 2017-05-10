
'use strict';

const bodyParser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var patient=require('./app/models/patient.model');
var visit=require('./app/models/visit.model');
var alergy=require('./app/models/Alergy.model');
var exam=require('./app/models/Examination.model');
const  DRoute=require('./app/routes/doctor.route.js');
const  NRoute=require('./app/routes/nurse.route.js');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/PatientProfile', err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

app.use('/app', express.static(__dirname + '/public'));
app.use('/app/modules', express.static(__dirname + '/bower_components'));

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/patients',DRoute);
app.use('/patients',NRoute);


app.get('/app/*', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('app listening on port 3000');
});

