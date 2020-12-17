var mongoose = require('mongoose');
var Movie = require('./routes/movies/movie');

var inferno = new Movie({
    ttnummer: 3062096,
    titel: 'Inferno',
    jaar: 2016,
    lengte: 121,
    regiseur: 'Ron Howard',
    beschrijving: 'When Robert Langdon wakes up in an Italian hospital with amnesia, ' +
    'he teams up with Dr. Sienna Brooks, and together they must race across Europe ' +
    'against the clock to foil a deadly global plot.'
});
var theshallows = new Movie({
    ttnummer: 4052882,
    titel: 'The Shallows',
    jaar: 2016,
    lengte: 86,
    regiseur: 'Jaume Collet-Serra',
    beschrijving: 'A mere 200 yards from shore, surfer Nancy is attacked by a great white shark,' +
    'with her short journey to safety becoming the ultimate contest of wills.'
});


var patriotsday = new Movie({
    ttnummer: 4572514,
    titel: 'Patriots Day',
    jaar: 2016,
    lengte: 133,
    regiseur: 'Peter Berg',
    beschrijving: 'The story of the 2013 Boston Marathon bombing and the aftermath, which includes the city-wide manhunt to find the terrorists responsible.'
});

var theaccountant = new Movie({
    ttnummer: 4572514,
    titel: 'The Accountant',
    jaar: 2016,
    lengte: 128,
    regiseur: 'Gavin O Connor',
    beschrijving: 'Christian Wolff is a math savant with more affinity for numbers than people. Behind the cover of a small-town CPA office, he works as a freelance accountant for some of the worlds most dangerous criminal organizations.'
});
var theGreatWall = new Movie({
    ttnummer: 2140479,
    titel: 'The Great Wall',
    jaar: 2016,
    lengte: 101,
    regiseur: 'Yimou Zhang',
    beschrijving: 'When a mercenary warrior (Matt Damon) is imprisoned within the Great Wall, he discovers the mystery behind one of the greatest wonders of the world. '
});

var sully = new Movie({
    ttnummer: 3263904,
    titel: 'Sully',
    jaar: 2016,
    lengte: 96,
    regiseur: 'Clint Eastwood',
    beschrijving: 'The story of Chesley Sullenberger,' +
    'an American pilot who became a hero after landing his damaged plane on' +
    'the Hudson River in order to save the flights passengers and crew.'
});
var therevenant = new Movie({
    ttnummer: 1663202,
    titel: 'The Revenant',
    jaar: 2015,
    lengte: 156,
    regiseur: 'Alejandro G. Iñárritu',
    beschrijving: 'A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled' +
    ' by a bear and left for dead by members of his own hunting team.'
});
var arrival = new Movie({
    ttnummer: 2543164,
    titel: 'Arrival',
    jaar: 2016,
    lengte: 116,
    regiseur: 'Denis Villeneuve',
    beschrijving: 'A linguist is recruited by the military to assist in translating alien communications.'
});

module.exports = function () {
    inferno.save();
    theshallows.save();
    patriotsday.save();
    theaccountant.save();
    theGreatWall.save();
    sully.save();
    arrival.save();
    console.log('test movies send to db')
};