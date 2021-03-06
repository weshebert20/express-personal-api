// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/****************
 * HTML Endpoints
 ****************/

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/********************
 * JSON API Endpoints
 ********************/

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: false, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's some random stuffs about me",
    documentation_url: "https://github.com/weshebert20/express-personal-api", // CHANGE ME
    base_url: "https://thawing-lake-26184.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "talk all about myself"}, // CHANGE ME
      {method: "GET", path: "/api/movies", description: "shows all of the movies in the database"},
      {method: "GET", path: "/api/movies/:id", description: "shows movie with specific id"},
      {method: "POST", path: "/api/movies", description: "create new movie with director and year released"},
      {method: "PUT", path: "/api/movies/:id", description: "update movie title/director/year released"},
      {method: "DELETE", path: "/api/movies/:id", description: "lets you delete a movie by id"},
    ]
  });
});


//profile information route
app.get('/api/profile', function(req, res){
  res.json({
    name: "Wes Hebert",
    github_link: "https://github.com/weshebert20",
    github_profile_image: "https://avatars1.githubusercontent.com/u/14166450?v=4&s=460",
    current_city: "Denver",
    pets:[{
      name: "Tucker",
      type: "Doggo",
      breed: "Mutt"
    }]
  });
});

// get movie route
app.get('/api/movies', function(req, res){
  db.Movie.find()
  .exec(function(err, movies){
    if (err) { return console.log("index error: " + err); }
      res.json(movies);
  });
});

// create show route by ID
app.get('/api/movies/:id', function(req,res){
  db.Movie.findOne({ _id: req.params.id }, function(err, data){
    res.json(data);
  });
});

// create movie route
app.post('/api/movies', function(req,res){
  let newMovie = new db.Movie({
    title: req.body.title,
    director: req.body.director,
    year_released: req.body.year_released
  });

  //save into database
  newMovie.save(function(err,movie){
    if (err){
      return console.log("save error:", err);
    }
    console.log("saved", movie.title);
    res.json(movie);
  });
});

// create update route
app.put('/api/movies/:id', function(req, res){
  db.Movie.findOne({_id: req.params.id}, function(err,movie){
      movie.title = req.body.title;
      movie.director = req.body.director;
      movie.year_released = req.body.year_released;
      movie.save();
      res.json(movie);
  });
});

// create delete route
app.delete('/api/movies/:id', function(req, res){
  let movieId = req.params.id;
  db.Movie.findOneAndRemove({_id: movieId}, function(err, deletedMovie){
    res.json(deletedMovie);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
