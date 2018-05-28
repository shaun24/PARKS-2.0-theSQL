// require the dependencies
require('dotenv').config();
var axios = require('axios');
var db = require("../models");
var keys = require("../keys.js");

// activate api keys
var googleMapsGeoKey = keys.google.id;

module.exports = function (app) {

    app.get("/api/parks", function (req, res) {
        db.Park.findAll({
            order: ["name"],
            include: [{
              model:db.Image
            },
            {
              model:db.Feature
            }]
          }).then(function (dbPark) {
            var hbsObject = {
              parks: dbPark,
              az: { selected: true }
            };
            console.log(hbsObject);
      
            res.json(hbsObject);
          });
    });

    app.get("/api/parks/:name", function (req, res) {
        db.Park.findOne({
            where: {
                name: req.params.name
            }
        }).then(function (dbPark) {
            var hbsObject = {
                parks: dbPark
            };
            res.json(hbsObject);
        })
    });

    // route to convert the address into latitude and longitude
    app.get("/api/latlng", function(req, res) {
        var latlngUrl = "https://maps.googleapis.com/maps/api/geocode/json";
        var parsedAddress = req.query.address.replace(/\s/g, "+")
        axios.get(latlngUrl, {
            params: {
                address: parsedAddress,
                key: googleMapsGeoKey
            }
        }).then(function(response) {
            res.json(response.data.results[0].geometry.location);
        }).catch(function(error) {
            res.json(error);
        });
    });


    // app.get("/api/basketball", function (req, res) {
    //     db.AllPark.findAll({
    //         where: {
    //             basketball: true
    //         }
    //     }).then(function (dbPark) {
    //         var hbsObject = {
    //             parks: dbPark
    //         };
    //         res.json(hbsObject);
    //     })
    // });

    // app.get("/api/dogpark", function (req, res) {
    //     db.AllPark.findAll({
    //         where: {
    //             dogPark: true
    //         }
    //     }).then(function (dbPark) {
    //         var hbsObject = {
    //             parks: dbPark
    //         };
    //         res.json(hbsObject);
    //     })
    // });

    // app.get("/api/golf", function (req, res) {
    //     db.AllPark.findAll({
    //         where: {
    //             golf: true
    //         }
    //     }).then(function (dbPark) {
    //         var hbsObject = {
    //             parks: dbPark
    //         };
    //         res.json(hbsObject);
    //     })
    // });

    // app.get("/api/playground", function (req, res) {
    //     db.AllPark.findAll({
    //         where: {
    //             playground: true
    //         }
    //     }).then(function (dbPark) {
    //         var hbsObject = {
    //             parks: dbPark
    //         };
    //         res.json(hbsObject);
    //     })
    // });

    // app.get("/api/soccer", function (req, res) {
    //     db.AllPark.findAll({
    //         where: {
    //             soccer: true
    //         }
    //     }).then(function (dbPark) {
    //         var hbsObject = {
    //             parks: dbPark
    //         };
    //         res.json(hbsObject);
    //     })
    // });

    // app.get("/api/tennis", function (req, res) {
    //     db.AllPark.findAll({
    //         where: {
    //             tennis: true
    //         }
    //     }).then(function (dbPark) {
    //         var hbsObject = {
    //             parks: dbPark
    //         };
    //         res.json(hbsObject);
    //     })
    // });

    // app.get("/api/trails", function (req, res) {
    //     db.AllPark.findAll({
    //         where: {
    //             trails: true
    //         }
    //     }).then(function (dbPark) {
    //         var hbsObject = {
    //             parks: dbPark
    //         };
    //         res.json(hbsObject);
    //     })
    // });

    // app.get("/api/vendingmachines", function (req, res) {
    //     db.AllPark.findAll({
    //         where: {
    //             vendingMachines: true
    //         }
    //     }).then(function (dbPark) {
    //         var hbsObject = {
    //             parks: dbPark
    //         };
    //         res.json(hbsObject);
    //     })
    // });

    // app.get("/api/views", function (req, res) {
    //     db.AllPark.findAll({
    //         where: {
    //             views: true
    //         }
    //     }).then(function (dbPark) {
    //         var hbsObject = {
    //             parks: dbPark
    //         };
    //         res.json(hbsObject);
    //     })
    // });

    // app.get("/api/watersports", function (req, res) {
    //     db.AllPark.findAll({
    //         where: {
    //             waterSports: true
    //         }
    //     }).then(function (dbPark) {
    //         var hbsObject = {
    //             parks: dbPark
    //         };
    //         res.json(hbsObject);
    //     })
    // });

    // app.get("/api/workoutgear", function (req, res) {
    //     db.AllPark.findAll({
    //         where: {
    //             workoutGear: true
    //         }
    //     }).then(function (dbPark) {
    //         var hbsObject = {
    //             parks: dbPark
    //         };
    //         res.json(hbsObject);
    //     })
    // });

};