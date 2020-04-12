# workout-tracker
This project uses MongoDB and Mongoose to log fitness data for a user.

## Functionality
This project uses CLI to populate premade html pages, then merges and serves the resulting html. The user initially inputs their team data into the CLI, then the code takes this list of member data and populates classes of each team member type. Then the team member classes are passed to a renderer which generates html for each team member. Then this html is merged into an overall page html and is served to the user.

## Run
In VS Code, you may open the terminal (Ctrl+\`), navigate to the main project folder, and run server.js ("node server.js").
Then go to http://localhost:3001 (or the url that is shown on the server console if different)

You may choose to continue an existing logged workout or add a new workout.

Then select the type of exercise and enter the data.

You may view previously entered data by going to the Fitness Tracker Dashboard which will serve up ueful visuals of the data.


## Repository
Repo: https://github.com/austin-e-cox/workout-tracker

## Deployed App
App: https://whispering-waters-97658.herokuapp.com/

## Preview:
![Workout Tracker Preview](/workout-tracker_preview.png?raw=true "Workout Tracker Preview")
