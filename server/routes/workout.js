var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Workout = require('../model/workout.js');
const workout = require('../model/workout.js');
let workoutController = require('../controllers/workout.js') //surveyController --> workoutController
/* Get route for the workout list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the workout list */
router.get('/',async(req,res,next)=>{
try{
    const WorkoutList = await Workout.find(); //SurveyList --> WorkoutList, Survey --> Workout
    res.render('Workout/list',{
        title:'Workout Tracker', //Surveys --> Workout Tracker
        WorkoutList:WorkoutList
    })}
    catch(err){
        console.error(err);
        res.render('Workout/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Workout/add',{
            title: 'Create a Workout Tracker'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Workout/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newWorkout = Workout({ // newSurvey --> newWorkout
            "Name":req.body.Name,
            "WorkoutType":req.body.WorkoutType,
            "ExerciseDetails":req.body.ExerciseDetails,
            "Duration":req.body.Duration,
            "PerformanceRating":req.body.PerformanceRating,
            "FitnessGoalSetting":req.body.FitnessGoalSetting
        });
        Workout.create(newWorkout).then(()=>{
            res.redirect('/workoutlist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Workout/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const workoutToEdit = await Workout.findById(id); //surveyToEdit --> workoutToEdit
        res.render('Workout/edit',
            {
                title:'Edit Workout Tracker',
                Workout:workoutToEdit
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
        let updatedWorkout = Workout({ //updatedSurvey --> updatedWorkout
            "_id":id,
            "Name":req.body.Name,
            "WorkoutType":req.body.WorkoutType,
            "ExerciseDetails":req.body.ExerciseDetails,
            "Duration":req.body.Duration,
            "PerformanceRating":req.body.PerformanceRating,
            "FitnessGoalSetting":req.body.FitnessGoalSetting
        });
        Workout.findByIdAndUpdate(id,updatedWorkout).then(()=>{
            res.redirect('/workoutlist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Workout/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Workout.deleteOne({_id:id}).then(()=>{
            res.redirect('/workoutlist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Workout/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;