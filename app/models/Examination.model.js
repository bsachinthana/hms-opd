'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExaminationSchema = new Schema({
    weight: {
        type: Number,
    },
      height: {
          type:  Number,
     },
    BMI: {
         type:  Number
       },
      SBP: {
      type:  Number
      },
    DBP: {
        type:  Number
    },
   temperature: {
        type:  Number
    },
    ExamDate: {
        type:Date, default:new Date()
    },
    visits: {
        type: Schema.Types.ObjectId,
        ref: 'Visit'
    }
});

const Examination = mongoose.model('Examination', ExaminationSchema);

module.exports = Examination;
