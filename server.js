var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require("./config.js");
var routes = require('./notfilxRouter');
var Movie = require('./routes/movies/movie');
var User = require('./routes/users/user');

mongoose.connect(config.database);

var films = require('./MoviesSetup.js');
var gebruikers = require('./UserSetup.js');

Movie.count(function (err, count) {
   if(!err && count === 0) {
       films();
   }
});
User.count(function (err, count) {
    if(!err && count === 0) {
        gebruikers();
    }
});
// films();
// gebruikers();

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/api', routes);


app.listen(8080, function () {
    console.log("Example app listening at port 8080")
});