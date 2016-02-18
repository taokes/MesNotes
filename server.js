"use strict";

require('colors');

var express 	= require('express'),
	bodyParser  = require('body-parser'),
	http        = require('http'),
	path        = require('path'),
	serveStatic = require('serve-static'),
    api 		= require('./routes/api');

var app = express();
var server = http.createServer(app);

app.set('port', process.env.PORT || 3002);
app.use(serveStatic(path.join(__dirname, 'app')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.render('index');
}),

// JSON API
app.get('/server/api/notes', api.fetchMovies);
app.get('/server/api/notes/:id', api.fetchMovie);
app.get('/server/api/notes/:id/user', api.fetchActorsOfMovie);
app.post('/server/api/notes', api.addMovie);
app.put('/server/api/notes', api.updateMovie);
app.delete('/server/api/notes/:id', api.deleteMovie);


server.listen(app.get('port'), function() {
	console.log('✔︎︎ Express server listening on http://localhost:%d/'.green, app.get('port'));
});
