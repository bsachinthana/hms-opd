'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    firstName: {
        type: String

    },
    Gardian: {
        type: String
    },
    GaurdianTel: {
        type: String
    },
    title: {
        type: String
    },
    Address: {
        type: String

    },
    NIC: {
        type: String

    },
    phone: {
        type: String

    },

    civilStatus: {
    type: String

},
    Birthday: {
        type: Date


    },
    Gender: {
        type: String

    },
    bloodGroup: {
        type: String

    },
    HIN: {
        type: String,
        unique: true

    },
    visits: [{
        type: Schema.Types.ObjectId,
        ref: 'Visit'
    }],
    Alergies: [{ type: Schema.Types.ObjectId,
        ref: 'Alergy'}],
});

var Patient = mongoose.model('Patient',PatientSchema);

module.exports = Patient;
