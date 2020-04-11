const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const workoutSchema = new Schema({
  date: {
    type: Date,
    default: date.now()
  },
  exercises: [
    {
      name: {
      type: String,
      required: true
      },
      type: {
        type: String,
        required: true
      },
      weight: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      duration: {
        type: Number,
      },
      distance: {
        type: Number,
      }
    }
  ]
})

module.exports = mongoose.model("Workout", workoutSchema);