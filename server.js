//module includes
const express = require("express");
const mongoose = require("mongoose");
const db = require("./models");
const app = express();

// set port number
const PORT = process.env.PORT || 3000;

// app middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// establish database connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true });

//----------------//
// database calls //
//----------------//

// create workout
app.post("/api/workouts", ({body}, res) => {
  db.Workout.create(body)
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
  db.workouts.findOne({
    _id: ObjectId(req.params.id)
  }, (err, data) => {
    // add the exercise to the existing one
    db.Workout.updateOne({_id: ObjectId(req.params.id)}, 
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
  db.Workout.find({})
    .then(dbBook => {
      res.json(dbBook);
    })
    .catch(err => {
      res.json(err);
  });
});

// get last workout
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbBook => {
      res.json(dbBook);
    })
    .catch(err => {
      res.json(err);
  });
});


// get workouts in range
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbBook => {
      res.json(dbBook);
    })
    .catch(err => {
      res.json(err);
  });
});
  
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
