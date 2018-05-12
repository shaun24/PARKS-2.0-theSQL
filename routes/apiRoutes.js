var db = require("../models");

module.exports = function (app) {

    app.get("/api/parks", function (req, res) {
        db.AllPark.findAll({
            order: ["parkName"]
        }).then(function (dbPark) {

            res.json(dbPark);
        });
    });

    app.get("/api/:name", function (req, res) {
        db.AllPark.findOne({
            where: {
                parkName: req.params.name
            }
        }).then(function (dbPark) {
            var hbsObject = {
                parks: dbPark
            };
            res.json(hbsObject);
        })
    });


    app.get("/api/basketball", function (req, res) {
        db.AllPark.findAll({
            where: {
                basketball: true
            }
        }).then(function (dbPark) {
            var hbsObject = {
                parks: dbPark
            };
            res.json(hbsObject);
        })
    });

    app.get("/api/dogpark", function (req, res) {
        db.AllPark.findAll({
            where: {
                dogPark: true
            }
        }).then(function (dbPark) {
            var hbsObject = {
                parks: dbPark
            };
            res.json(hbsObject);
        })
    });

    app.get("/api/golf", function (req, res) {
        db.AllPark.findAll({
            where: {
                golf: true
            }
        }).then(function (dbPark) {
            var hbsObject = {
                parks: dbPark
            };
            res.json(hbsObject);
        })
    });

    app.get("/api/playground", function (req, res) {
        db.AllPark.findAll({
            where: {
                playground: true
            }
        }).then(function (dbPark) {
            var hbsObject = {
                parks: dbPark
            };
            res.json(hbsObject);
        })
    });

    app.get("/api/soccer", function (req, res) {
        db.AllPark.findAll({
            where: {
                soccer: true
            }
        }).then(function (dbPark) {
            var hbsObject = {
                parks: dbPark
            };
            res.json(hbsObject);
        })
    });

    app.get("/api/tennis", function (req, res) {
        db.AllPark.findAll({
            where: {
                tennis: true
            }
        }).then(function (dbPark) {
            var hbsObject = {
                parks: dbPark
            };
            res.json(hbsObject);
        })
    });

    app.get("/api/trails", function (req, res) {
        db.AllPark.findAll({
            where: {
                trails: true
            }
        }).then(function (dbPark) {
            var hbsObject = {
                parks: dbPark
            };
            res.json(hbsObject);
        })
    });

    app.get("/api/vendingmachines", function (req, res) {
        db.AllPark.findAll({
            where: {
                vendingMachines: true
            }
        }).then(function (dbPark) {
            var hbsObject = {
                parks: dbPark
            };
            res.json(hbsObject);
        })
    });

    app.get("/api/views", function (req, res) {
        db.AllPark.findAll({
            where: {
                views: true
            }
        }).then(function (dbPark) {
            var hbsObject = {
                parks: dbPark
            };
            res.json(hbsObject);
        })
    });

    app.get("/api/watersports", function (req, res) {
        db.AllPark.findAll({
            where: {
                waterSports: true
            }
        }).then(function (dbPark) {
            var hbsObject = {
                parks: dbPark
            };
            res.json(hbsObject);
        })
    });

    app.get("/api/workoutgear", function (req, res) {
        db.AllPark.findAll({
            where: {
                workoutGear: true
            }
        }).then(function (dbPark) {
            var hbsObject = {
                parks: dbPark
            };
            res.json(hbsObject);
        })
    });

};