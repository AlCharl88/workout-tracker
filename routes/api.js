const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", ({ body }, res) => {
  Workout.find(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
