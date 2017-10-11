// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

var db = require('./models');

var new_movie = [
	{
		name: "Jurassic Park",
		director: "Steven Spielberg",
		year_released: 1993
	},
	{
		name: "mother!",
		director: "Darren Arronofsky",
		year_released: 2017
	},
	{
		name: "Arrival",
		director: "Denis Villeneuve",
		year_released: 2016
	},
	{
		name: "Kubo and the Two Strings",
		director: "Travis Knight",
		year_released: 2016
	},
];

db.Movie.create(new_movie, function(err, movie){
	if(err){
		return console.log("Error:", err);
	}

	console.log("Created new movies", movie._id);
	process.exit();
});




