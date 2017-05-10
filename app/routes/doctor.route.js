

 'use strict';

 const express = require('express'),
     mongoose = require('mongoose');

 mongoose.set('debug', false);

 const PatientModel = mongoose.model('Patient'),
     visitModel = mongoose.model('Visit'),
     AlergyModel=mongoose.model('Alergy'),
     ExamModel=mongoose.model('Examination');


 const Router = express.Router();

 Router.get('/', (req, res) => {
     if(req.query.hin){
         PatientModel.find({HIN:req.query.hin}).populate('Alergies').populate('visits').exec().then(patient => {
             res.json(patient || {});
         }).catch(err => {
             console.error(err);
             res.sendStatus(500);
         });

     }
   else  if(req.query.nic){
         PatientModel.find({NIC:req.query.nic}).populate('Alergies').populate('visits').exec().then(patient => {
             res.json(patient || {});
         }).catch(err => {
             console.error(err);
             res.sendStatus(500);
         });

     } else  if(req.query.visitid){
         visitModel.find({vid:req.query.visitid}).exec().then(visit => {
             res.json(visit || {});
         }).catch(err => {
             console.error(err);
             res.sendStatus(500);
         });

     }
     else{
         PatientModel.find().populate('Alergies').populate( 'visits').exec().then(patients => {
             res.json(patients);
         }).catch(err => {
             console.error(err);
             res.sendStatus(500);
         });
     };

 });

 Router.get('/:id', (req, res) => {
     PatientModel.findById(req.params.id).populate('visits').populate('Alergies').exec().then(patient => {
         res.json(patient || {});
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });
 Router.get('/Alergies/:id', (req, res) => {
     AlergyModel.findById(req.params.id).populate('Alergies').exec().then(alergy => {
         res.json(alergy || {});
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });
 Router.put('/alergies/:id', (req, res) => {
     AlergyModel.findById(req.params.id, function(err, updatedalergy) {
         if (err)
             res.send(err);


         updatedalergy.alergy = req.body.alergy;
         updatedalergy.remarks = req.body.remarks;


         updatedalergy.save(function(err) {
             if (err)
                 res.send(err);

             res.json(updatedalergy);
         });
     });
 });




 Router.post('/:id/alergies', (req, res) => {
     let alergy = new AlergyModel(req.body);
     const patientID = req.params.id;
     alergy.patient = patientID;
     alergy.save().then(alergydb => {
         return PatientModel.findByIdAndUpdate(patientID, {$push: {"Alergies": alergydb._id}})
     }).then(() => {
         return PatientModel.findById(patientID).populate('Alergies').exec();
     }).then(patientDb => {
         res.json(patientDb);
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });



 Router.post('/', (req, res) => {
     const patient = new PatientModel(req.body);
     patient.save().then(patient => {
         res.json(patient);
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });


 Router.post('/:id/visits', (req, res) => {
     let visit = new visitModel(req.body);
     const patientID = req.params.id;
     visit.patient = patientID;
     visit.save().then(visitDb => {
         return PatientModel.findByIdAndUpdate(patientID, {$push: {"visits": visitDb._id}})
     }).then(() => {
         return PatientModel.findById(patientID).populate('visits').exec();
     }).then(patientDb => {
         res.json(patientDb);
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });
 /*Router.put('/examinations/:id', (req, res) => {
     let exam = new ExamModel(req.body);
     const visitID = req.params.id;
     exam.visits = visitID;
     exam.save().then(examDb => {
         return visitModel.findByIdAndUpdate(visitID, {$set: {"Examination": examDb._id}})
     }).then(() => {
         return visitModel.findById(visitID).populate('Examination').exec();
     }).then(visitdb => {
         res.json(visitdb);
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });*/

 Router.delete('/Alergies/:id', (req, res) => {
     const aid = req.params.id;

     AlergyModel.findById(req.params.id).then(alergy => {
         const pid = alergy.patient;
         return PatientModel.findByIdAndUpdate(pid, {$pull: {"Alergies": alergy._id}})

     }).then(() => {

         return AlergyModel.findByIdAndRemove(req.params.id);


     }).then(() => {
         res.sendStatus(200);
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });
 module.exports = Router;