var mongoose = require('mongoose');
var User = require('./routes/users/user');

var user1 = new User({
    achternaam: 'achternaam1',
    tussenvoegsel: 'tussenvoegsel1',
    voornaam: 'voornaam1',
    gebruikersnaam: 'gebruikersnaam1',
    wachtwoord: 'wachtwoord1',
});

var user2 = new User({
    achternaam: 'achternaam2',
    tussenvoegsel: 'tussenvoegsel2',
    voornaam: 'voornaam2',
    gebruikersnaam: 'gebruikersnaam2',
    wachtwoord: 'wachtwoord2',
});
module.exports = function () {
    user1.save();
    user2.save();
    console.log('test users send to db')
};
