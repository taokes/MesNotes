"use strict";


var _ = require('lodash'),
	NOTES = require('./data/notes').notes;

/**
 * variable to act as a generated id
 * @type {number}
 */
var ID = 9;

/**
 * Fetch all notes
 * If category query is provided, fetch notes filtered by category
 */
exports.fetchMovies = function (req, res) {
    var notes = [];
    if(req.query.category){
        notes = NOTES.filter(function(movie){
            return movie.category === req.query.category;
        });
    } else {
        notes = NOTES;
    }
    return res.status(200).json(notes);

};


/**
 * Fetch a movie by id
 */
exports.fetchMovie = function (req, res){
    var id = req.params.id,

	movie = _.find(NOTES, function (movie) {
		return movie.id == id;
	});

	if (movie) {
		return res.status(200).json(movie);
	} else {
		return res.status(404).end();
	}
};

/**
 * Fetch actors of a movie
 */
exports.fetchActorsOfMovie = function(req, res){
    var id = req.params.id,

	movie = _.find(NOTES, function (movie) {
		return movie.id == id;
	});

	if (movie.length !== 0) {
		return res.status(200).json(movie.actors);
	} else {
		return res.status(404).end();
	}
}

/**
 * Create a movie
 */
exports.addMovie = function (req, res) {
    var movieToAdd = req.body;

	var existingMovie = _.find(NOTES, function (movie) {
		return movieToAdd.title == movie.title;
	});

	if (existingMovie) {
		return res.status(500).json({ error: 'Le film ' + existingMovie.title + ' a déjà été ajouté.' });
	} else {
		ID ++;
		movieToAdd.id = ID;
		NOTES.push(movieToAdd);
		return res.status(201).json(movieToAdd);
	}
};


/**
 * Update a movie
 */
exports.updateMovie = function(req, res) {
    var movietoUpdate = req.body;

	_.forEach(NOTES, function (movie, index) {
		if (movie.id == movietoUpdate.id) {
			NOTES[index] = movietoUpdate;
			return res.status(200).end();
		}
	});

	return res.status(304).end();
};


/**
 * Delete a movie
 */
exports.deleteMovie = function (req, res) {
    var id = req.params.id,

	removedMovies = _.remove(NOTES, function (movie) {
		return movie.id == id;
	});

	if (_.isEmpty(removedMovies)) {
		return res.status(304).end();
	} else {
		return res.status(200).end();
	}

};
