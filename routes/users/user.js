var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    achternaam: { type: String, required: true },
    tussenvoegsel: { type: String, required: false },
    voornaam: { type: String, required: true },
    gebruikersnaam: { type: String, required: true },
    //door het toevoegen van select false wordt het wachtwoord niet megegeven met normale zoekqueries.
    wachtwoord: { type: String, required: true, select: false },
});

module.exports = mongoose.model('user', userSchema);
