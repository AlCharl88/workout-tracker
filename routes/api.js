const router = require("express").Router();
const mongoose = require("mongoose");
const Workout = require("../models/workout.js");
const castAggregation = require('mongoose-cast-aggregation');


mongoose.plugin(castAggregation);

// create workouts
router.post("/api/workouts", ({ body }, res) => {
    console.log(body);
    Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// add exercises

router.put("/api/workouts/:id", (req, res) => {

    Workout.findOneAndUpdate({ _id: req.params.id },
        { $inc: { totalDuration: req.body.duration }, $push: { exercises: req.body }},
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

});

// get workouts
router.get("/api/workouts", (req, res) => {
    Workout.aggregate().project({'day':1,'exercises.duration':1,'exercises.sets':1,'exercises.weight':1,'exercises.reps':1,'exercises.distance':1,'exercises.type':1,'exercises.name':1}).addFields(
    {totalDuration:{$sum: '$exercises.duration'},totalSets:{$sum: '$exercises.sets'},totalWeight:{$sum:'$exercises.weight'},totalReps:{$sum:'$exercises.reps'},
    totalDistance:{$sum:'$exercises.distance'}})
      .sort({ day: 1 })
      .then(dbWorkout => {
        res.json(dbWorkout);
    })
      .catch(err => {
      res.status(400).json(err);
    });
  });

// get workouts over range of days
router.get("/api/workouts/range", (req, res) => {
    
  const endDate = new Date();
  const startDate = new Date().setDate(new Date().getDate() -6);
 
  const beginningDate = new Date(startDate);
  const endingDate = new Date(endDate);
  
  Workout.aggregate([{$match: {day: {$gte: beginningDate, $lte: endingDate}}}]).project({'day':1,'exercises.duration':1,'exercises.sets':1,'exercises.weight':1,'exercises.reps':1,'exercises.distance':1,'exercises.type':1,'exercises.name':1}).addFields(
    {totalDuration:{$sum: '$exercises.duration'},totalSets:{$sum: '$exercises.sets'},totalWeight:{$sum:'$exercises.weight'},totalReps:{$sum:'$exercises.reps'},
    totalDistance:{$sum:'$exercises.distance'}})
    .sort({ day: 1 })
    .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});


// get exercice 
router.get("/exercise", (req, res) => {

  Workout.find({})
  .sort({ day: 1 })
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

module.exports = router;
