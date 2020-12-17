var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    ttnummer: {type: String, required: true},
    titel: {type: String, required: true},
    jaar: {type: Number, required: true},
    lengte: {type: Number, required: true},
    regiseur: {type: String, required: true},
    beschrijving: {type: String, required: true},
    beoordeling: [
        {
            userId: {type: String, required: true, select: false},
            value: {type: Number}
        }
    ]
});

module.exports = mongoose.model('movie', movieSchema);
