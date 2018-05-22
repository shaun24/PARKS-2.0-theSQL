var db = require("../models");

module.exports = function (app) {
  //Home Page
  //=======================================================
  app.get("/", function (req, res) {
    db.Park.findAll({}).then(function (dbPark) {

      var hbsObject = {
        parks: dbPark,
        home: { selected: true }
      };
      res.render("index", hbsObject);


    });
  });

  //Parks A-Z 
  //====================================================== 
  app.get("/all-parks", function (req, res) {
    db.Park.findAll({
      order: ["name"]

    }).then(function (dbPark) {
      var hbsObject = {
        parks: dbPark,
        az: { selected: true }
      };
      console.log(hbsObject);

      res.render("all-parks", hbsObject);
    });
  });

  //All Features
  //=====================================================
  app.get("/all-features", function (req, res) {
    db.Park.findAll({}).then(function (dbPark) {
      var hbsObject = {
        parks: dbPark,
        feat: { selected: true }
      };

      res.render("all-features", hbsObject);
    });
  });

  //About
  //=====================================================
  app.get("/about", function (req, res) {
    db.Park.findAll({
      order: ["name"]
    }).then(function (dbPark) {
      var hbsObject = {
        parks: dbPark,
        about: { selected: true }
      };
      res.render("about", hbsObject);
    });
  });

  //Add Park
  //===================================================== 
  app.get("/add-park", function (req, res) {
    db.Park.findAll({}).then(function (dbPark) {
      var hbsObject = {
        parks: dbPark,
        add: { selected: true }
      };

      res.render("add-park", hbsObject);
    });
  });

  app.get("/add-feature", function (req, res) {
    db.Park.findAll({
      order: ["name"]

    }).then(function (dbPark) {
      var hbsObject = {
        parks: dbPark,
        az: { selected: true }
      };

      db.AvailFeature.findAll({
        order: ["name"]
      }).then(function(dbFeature) {
        hbsObject.features = dbFeature;
        res.render("add-feature", hbsObject);
      });

    });

  });

  //Individual Feature Page
  //=====================================================
  app.get("/features/:feature", function (req, res) {
    var feature = req.params.feature;
    var whereClause = {};
    console.log(feature);
    switch (feature) {
      case "basketball":
        whereClause = { basketball: true };
        break;

      case "dogPark":
        whereClause = { dogPark: true };
        break;

      case "golf":
        whereClause = { golf: true };
        break;

      case "handiAcces":
        whereClause = { handiAcces: true };
        break;

      case "playground":
        whereClause = { playground: true };
        break;

      case "soccer":
        whereClause = { soccer: true };
        break;

      case "tennis":
        whereClause = { tennis: true };
        break;

      case "trails":
        whereClause = { trails: true };
        break;

      case "vendingMachines":
        whereClause = { vendingMachines: true };
        break;

      case "views":
        whereClause = { views: true };
        break;

      case "waterSports":
        whereClause = { waterSports: true };
        break;

      case "workoutGear":
        whereClause = { workoutGear: true };
        break;

      case name:
        whereClause = { name: req.param.body }


    }
    db.Park.findAll({
      where: whereClause,
      order: ["name"]
    }).then(function (dbPark) {
      var hbsObject = {
        parks: dbPark,
        layout: "main"
      };

      res.render("feature", hbsObject);

    });
  });

  //Individual Park Page 
  //=====================================================

  app.get("/:name", function (req, res) {
    db.Park.findOne({
      where: {
        name: req.params.name
      }
    }).then(function (dbPark) {
      var hbsObject = {
        parks: dbPark
      };


      res.render("park", hbsObject);
    });
  });


  // API Post
  //======================================================= 

  app.post("/api/parks", function (req, res) {
    if (req.body.restrooms === "") {
      req.body.restrooms = 0;
    };
    if (req.body.size === "") {
      req.body.size = null;
    };
    db.Park.create(
      req.body
    ).then(function (dbPark) {
      res.json(dbPark);
    }).catch(function (err){
      res.json(err);
    });
  });

  app.post("/api/features", function (req, res) {
    db.Feature.bulkCreate(
      req.body.array
    ).then(function(dbFeature) {
      res.json(dbFeature);
    }).catch(function(err) {
      res.json(err);
    });
    // db.Feature.create(
    //   req.body
    // ).then(function (dbFeature) {
    //   res.json(dbFeature);
    // }).catch(function (err){
    //   res.json(err);
    // });
  });

//sign-in

app.get("/sign-in", function (req, res) {
  db.User.findAll({}).then(function (dbUser) {
    var hbsObject = {
      users: dbUser,
      add: { selected: true }
    };

    res.render("sign-in", hbsObject);
  });
});
};
