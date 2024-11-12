//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let workoutModel = mongoose.Schema({
    Name: String,
    WorkoutType: String,
    ExerciseDetails: String,
    Duration: Number,
    PerformanceRating: Number,
    FitnessGoalSetting: String
},

{
    collection:"Workout_tracker"
});
module.exports =mongoose.model('Workout',workoutModel);
//Survey --> Workout
//surveyModel --> workoutModel