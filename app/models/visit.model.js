'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VisitSchema = new Schema({
    complaint: {
        type: String
    },
        visitType: {
            type: String
        },
    vid: {
        type: String,
        unique: true
    },
        date: {
             type:Date, default:new Date()
       },
    remarks: {
        type: String
    },
      //  doctor: {
      //  type: String
  //  },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },
    Examination: {
        type: Schema.Types.ObjectId,
        ref: 'Examination'
    }


});

const Visit = mongoose.model('Visit', VisitSchema);

module.exports = Visit;
