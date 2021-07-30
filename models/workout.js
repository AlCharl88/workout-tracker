const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
    },

    exercises: [
     {
        type: String,
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number
     }
    ],
    
});

const workout = mongoose.model("workout", workoutSchema);

module.exports = workout;