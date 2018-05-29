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
      console.log(dbPark[0].dataValues.Images[0].dataValues.file);

      res.render("all-parks", hbsObject);
    });
  });

  // app.get("/all-parks2", function (req, res) {
  //   db.Park.findAll({
  //     order: ["name"],
  //     include: [{
  //       model:db.Image
  //     },
  //     {
  //       model:db.Feature
  //     }]
  //   }).then(function (dbPark) {
  //     var hbsObject = {
  //       parks: dbPark,
  //       az: { selected: true }
  //     };
  //     console.log(hbsObject);

  //     res.json(hbsObject);
  //   });
  // });

  //All Features
  //=====================================================
  app.get("/all-features", function (req, res) {
    db.AvailFeature.findAll({
      order: ["name"]
    }).then(function (dbAvailFeature) {
      var img;
      dbAvailFeature.forEach(function(item) {
        img = item.dataValues.name.toLowerCase().replace(/\s/g, "_");
        item.dataValues.icon = `${img}.png`
      });
      var hbsObject = {
        features: dbAvailFeature,
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
        // ,
        // helpers:{
        //   eq: function (a,b) {return a == b;}
        // }
      };

      db.AvailFeature.findAll({
        order: ["name"]
      }).then(function (dbFeature) {
        hbsObject.features = dbFeature;

        db.AvailDetail.findAll({
          order: ["name"]
        
        }).then(function(dbDetail){
          hbsObject.details = dbDetail;
          //console.log(dbDetail[0].dataValues.AvailFeatureId);
          res.render("add-feature", hbsObject);
        })
      });

    });

  });

  app.get("/add-detail", function (req, res) {
    db.Park.findAll({
      order: ["name"]

    }).then(function (dbPark) {
      var hbsObject = {
        parks: dbPark,
        az: { selected: true }
      };
        res.render("add-detail", hbsObject);
      });

    });

    
  //Individual Feature Page
  //=====================================================
  app.get("/features?:feature", function (req, res) {
    var feature = req.query.name;
    // var whereClause = {};
    // console.log(feature);
    // switch (feature) {
    //   case "basketball":
    //     whereClause = { basketball: true };
    //     break;

    //   case "dogPark":
    //     whereClause = { dogPark: true };
    //     break;

    //   case "golf":
    //     whereClause = { golf: true };
    //     break;

    //   case "handiAcces":
    //     whereClause = { handiAcces: true };
    //     break;

    //   case "playground":
    //     whereClause = { playground: true };
    //     break;

    //   case "soccer":
    //     whereClause = { soccer: true };
    //     break;

    //   case "tennis":
    //     whereClause = { tennis: true };
    //     break;

    //   case "trails":
    //     whereClause = { trails: true };
    //     break;

    //   case "vendingMachines":
    //     whereClause = { vendingMachines: true };
    //     break;

    //   case "views":
    //     whereClause = { views: true };
    //     break;

    //   case "waterSports":
    //     whereClause = { waterSports: true };
    //     break;

    //   case "workoutGear":
    //     whereClause = { workoutGear: true };
    //     break;

    //   case name:
    //     whereClause = { name: req.param.body }

    // }

    db.Park.findAll({
      include: [
        {
          model: db.Feature,
          where: {
            name: feature
          }
        },
        {
          model: db.Image
        }
      ]
    }).then(function (dbPark) {
      var hbsObject = {
        parks: dbPark,
        layout: "main"
      };
      console.log(hbsObject);
      res.render("feature", hbsObject);
    });
  });

  //Individual Park Page 
  //=====================================================

  app.get("/:name", function (req, res) {
    db.Park.findOne({
      where: {
        name: req.params.name
      },
      include: [{
        model:db.Image
      },
      {
        model:db.Feature
      }]
    }).then(function (dbPark) {
      var hbsObject = {
        parks: dbPark
      };


      res.render("park", hbsObject);
    });
  });




  //GET all features for one park
  //=======================================================

  app.get("/api/park/features/:id", function (req, res) {
    db.Feature.findAll({
      where: {
        ParkId: req.params.id
      }
    }).then(function (dbFeature) {
      res.json(dbFeature);
    }).catch(function(err){
      res.json(err);
    })
  });

  app.get("/api/availdetails", function (req, res){
    db.AvailDetail.findAll({
    }).then(function(dbAvailDetails){
      res.json(dbAvailDetails);
    }).catch(function(err){
      res.json(err);
    })
  })



  // API Post
  //======================================================= 

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
