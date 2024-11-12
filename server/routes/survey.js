var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Survey = require('../model/survey.js');
const survey = require('../model/survey.js');
let surveyController = require('../controllers/surevy.js')
/* Get route for the survey list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the surveys list */
router.get('/',async(req,res,next)=>{
try{
    const SurveyList = await Survey.find();
    res.render('Survey/list',{
        title:'Surveys',
        SurveyList:SurveyList
    })}
    catch(err){
        console.error(err);
        res.render('Survey/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Survey/add',{
            title: 'Create a Survey'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Survey/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newSurvey = Survey({
            "Name":req.body.Name,
            "JobTitle":req.body.JobTitle,
            "Satisfaction":req.body.Satisfaction,
            "DurationOfEmployment":req.body.DurationOfEmployment,
            "Improvments":req.body.Improvments
        });
        Survey.create(newSurvey).then(()=>{
            res.redirect('/surveyslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Survey/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const surveyToEdit= await Survey.findById(id);
        res.render('Survey/edit',
            {
                title:'Edit Survey',
                Survey:surveyToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedSurvey = Survey({
            "_id":id,
            "Name":req.body.Name,
            "JobTitle":req.body.JobTitle,
            "Satisfaction":req.body.Satisfaction,
            "DurationOfEmployment":req.body.DurationOfEmployment,
            "Improvments":req.body.Improvments
        });
        Survey.findByIdAndUpdate(id,updatedSurvey).then(()=>{
            res.redirect('/surveyslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Survey/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Survey.deleteOne({_id:id}).then(()=>{
            res.redirect('/surveyslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Survey/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;