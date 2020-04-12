//module includes
const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const Workout = require("./models/workout");
const app = express();

// set port number
const PORT = process.env.PORT || 3001;

// app middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// establish database connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// route to exercise page
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + '/public/exercise.html'));
});

// route to stats page
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + '/public/stats.html'));
});


//----------------//
// database calls //
//----------------//

// create workout
app.post("/api/workouts", ({body}, res) => {
  Workout.create(body)
    .then(db_res => {
      res.json(db_res);
    })
    .catch(err => {
      res.json(err);
  });
});

// add exercise
app.put("/api/workouts/:id", (req, res) => {
  // find the exercise in the database
  Workout.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, 
    // add the exercise to the existing one
    (err, data) => {
    Workout.updateOne({_id: mongojs.ObjectId(req.params.id)}, 
    {
      $set: {
        exercises: [...data.exercises, req.body]
      }
    },
      // final process after data is updated
      (err, data) => {
        if (err)
          res.send(err);
        res.json(data);
    })
  })
})

// get workouts
app.get("/api/workouts", (req, res) => {
  Workout.find({}, 
    (err, data) => {
      if (err)
        res.send(err);
      // if no data, return blank
      if (data.length === 0){
        res.json(data);
        return;   
      }
      
      // determine duration of last exercise
      let workoutDuration = 0;
      const last = data.length-1;
      const lastWorkout = data[last];
      lastWorkout.exercises.forEach(exercise => {
        workoutDuration += exercise.duration;
      });

      // add duration into data to return to client
      // must dig down into object's _doc for it to be set properly
      data[last]._doc.totalDuration = workoutDuration;
      res.json(data);
  })
});

// get workouts in range
app.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then(dbBook => {
      res.json(dbBook);
    })
    .catch(err => {
      res.json(err);
  });
});


// start app
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
