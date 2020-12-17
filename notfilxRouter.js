var express = require('express');
var router = express.Router();
var Movie = require('./routes/movies/movie');
var User = require('./routes/users/user');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require("./config.js");
var secret = new Buffer('yoursecret', 'base64').toString();
var secureRoutes = require('./secureRouter');





secureRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.headers['authorization']


    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret.toString(), function(err, decoded) {
            if (err) {
                console.log(err)
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});


router.get('/returnMovieById/:id', function (req, res) {
    /**
     * req.params.id komt overeen met :id hierboven
     */
    Movie.findOne({ttnummer: req.params.id}, function (err, resultaat) {
        if (err) {
            console.log(err);
        } else {
            if(resultaat !== null){
                res.status(200).json(resultaat);
                console.log(resultaat);
            } else{
                res.status(204).toJSON("Er bestaan geen films met dit id")
            }
        }

    });
});

router.post('/authenticate', function(req, res) {

    // find the user
    /**
     * Zoek alle gebruikers opp zodat we die kunnen vergelijken met de invoer.
     * Ommdat het veld voor wachtwoord standaard wordt verborgen moet deze nu expliciet aangegeven worden.
     */
    User.findOne({username: req.body.name}, '+wachtwoord', function(err, user) {
            // check if password matches
            if (user.password != req.body.password) {
                console.log("werkeerde wachtwoord");
            } else {

        var token = jwt.sign({_id: user.gebruikersnaam}, config.secret.toString(), {
                    //het token blijft 24 uur geldig
                    expiresIn: 1440,

                });
                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Uw token is gevalideerd',
                    token: token
                });
            }
    });
});


router.get('/getrate/:ttNumber', function (req, res) {
    Movie.find({ttnummer: req.query.ttNumber}, function (err, resultaat) {
        if (err) {
            console.log(err);
        }
        console.log(resultaat);

    });
    res.status(200).json("rating");
});


router.post('/registerUser/:voornaam/:tussenvoegsel/:achternaam/:gebruikersnaam/:wachtwoord', function (req, res)
    {
    var newUser = new User({
        voornaam: req.params.voornaam,
        tussenvoegsel: req.params.tussenvoegsel,
        achternaam: req.params.achternaam,
        gebruikersnaam: req.params.gebruikersnaam,
        wachtwoord: req.params.wachtwoord
    });

    newUser.save(function (err, result) {
        if(err){
            console.log(err)
        } else{
            console.log('succes');
        }

    })
        res.status(200).json("opgeslagen");
});

//todo veranderen
router.get('/', function (req, res) {
    Movie.find({}, function (err, resultaat) {
        if(err){
            console.log(err);
        }
        else{
            res.status(200).json(resultaat);
        }
        console.log(resultaat)
    });
});

router.get('/returnMovieList/:pagination(\d+)?' , function (req, res) {
    var page = req.query.pagination;

    console.log(page);
    Movie.find({}, function (err, resultaat) {
        if(err){
            console.log(err);
        }
        if(page !== undefined){;
            var ret = resultaat.slice(page, page + 1);
            res.status(200).json(ret);
        }

        else{
            res.status(200).json(resultaat);
        }
        console.log("r " + resultaat.length);
    });
});

//todo nog afschermen
router.get('/returnUserByUsername/:gebruikersnaam', function (req, res) {
    User.findOne({gebruikersnaam: req.params.gebruikersnaam}, function (err, resultaat) {
        if (err) {
            console.log(err);
        } else {
            if(resultaat !== null){
                res.status(200).json(resultaat);
                console.log(resultaat);
            } else{
                res.status(204).toJSON("Er bestaan geen gebruikers met deze gebruikersnaam")
            }
        }

    });
});

router.use('/secure', secureRoutes);

module.exports = router;