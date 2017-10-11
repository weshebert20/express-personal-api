const mongoose = require('mongoose');
	Schema = mongoose.Schema;

let MovieSchema = new Schema({
	name: String,
	director: String,
	year_released: String
});

let Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;