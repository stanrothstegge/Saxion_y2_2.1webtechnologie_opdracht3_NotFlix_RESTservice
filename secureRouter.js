/**
 * SecureRouter
 * Alle calls binnen deze router alleen toegankelijk voor geauthoriseerde gebruikers.
 */
var express = require('express');
var secureRouter = express.Router();
var Movie = require('./routes/movies/movie');
var User = require('./routes/users/user');
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require("./config.js");
//todo nog afschermen

/**
 * returnt een lijst met alle gebruikers.
 * Alle standaard atributen worden meegegeven.
 */
secureRouter.get('/getUsers', function (req, res) {
    User.find({}, function (err, resultaat) {
        if (err) {
            console.log(err);

        } else if (!resultaat) {
            res.status(204);
        } else{
            res.status(200).json(resultaat);
            console.log(resultaat)
        }
    });
});

/**
 * Via deze call kan een gebruiker een film beoordelen
 * param1 (ttnummer) : id van de film
 * param2 (ratingValue) : waarde tussen 0.5 - 5
 */


secureRouter.get('/getMovieAvarage/:film', function (req, res) {
    Movie.find({ttnummer: req.params.film}, function (err, resultaat) {
        if(err){
            console.log(err)
            res.status(513).json("er is een onbekende fout opgetreden")
        }
       if(!resultaat) { //er wordt gezocht naar een niet bestaande film
           res.status(204).json({succes:false, message:"er bestaat geen film voor deze zoekopdacht"})
       } else {
           console.log(resultaat);
           var ArrayToObject = resultaat[0];
           //array met alle
           var beoordelingen = ArrayToObject.beoordeling;
           //
           var total = 0;
           for (i = 0; i < beoordelingen.length; i++) {
               var cijfer = beoordelingen[i].value;
                var total = total + cijfer;
           }
           var gemiddelde = total /beoordelingen.length;
           //stuur het gemiddellde terug met statuscode 200 (ok)
           res.status(200).json(gemiddelde);
       }
    });
});

secureRouter.delete('/deleteRating/:film', function (req,res) {

    var token = req.headers['authorization'];
    var decodedUsername = jwt.verify(token, config.secret)
    var idSignedInUser = resultaat._id;
    User.find({}, function (err, resultaat) {
        console.log(resultaat);
        for (i = 0; i < resultaat.length; i++) {
            var identi = resultaat[i].gebruikersnaam;
            if(identi === idSignedInUser ){
                resultaat[i]
            }
        }


    });
    Movie.find({}, function (err, resultaat) {
        if (err) {
            console.log(err)
            res.status(513).json("er is een onbekende fout opgetreden")
        }
        if (!resultaat) { //er wordt gezocht naar een niet bestaande film
            res.status(204).json({
                succes: false,
                message: "Er bestaat geen rating voor deze film / rating is al verwijderd"
            });
        } else {
            console.log(resultaat);
            var ArrayToObject = resultaat[0];
            //array met alle
            // var beoordelingen = ArrayToObject.beoordeling;
            // //
            // var total = 0;
            // for (i = 0; i < beoordelingen.length; i++) {
            //     var cijfer = beoordelingen[i].value;
            //     var total = total + cijfer;
            // }
            //var gemiddelde = total / beoordelingen.length;
            //stuur het gemiddellde terug met statuscode 200 (ok)

        }

        res.status(200).json("");
    });
});
secureRouter.post('/ratemovie/:film/:value', function (req, res) {
    //Id dat mongo genereerd
    var generatedId;
    var titel = "";
    //rating van de gebruiker 0.5 tm 5
    //Zoek film beoordeeld door gebruiker
    var token = req.headers['authorization'];
    var decodedUsername = jwt.verify(token, config.secret);
    Movie.find({ttnummer: req.params.film}, function (err, resultaat) {
        if (!resultaat | resultaat == undefined) {
            res.status(204).json({success: false, message: 'er bestaat geen film in de database met dit ttnumber'});
        } else if (err) {
            console.log(err);
            console.status(300);
        } else {
            console.log(resultaat);
            var obj = resultaat[0];
            generatedId = obj._id;
            titel = obj.titel;
            //Voeg beoordeling to aan beoordeling array
            var user;
            User.findOne({_id: decodedUsername}, function (err, resul) {

                user = resul.gebruikersnaam;
                Movie.update(
                    {_id: generatedId}, {
                        $addToSet: {
                            'beoordeling': {
                                //todo correcte userid
                                'userId': user,
                                'value': req.params.value
                            }
                        }
                    }, function (err) {
                    });
            });
            res.status(200).json("rating for " + titel + " beoordeeld met " + req.params.value);
        }
    });
});

    module.exports = secureRouter;
