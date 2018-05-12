var db = require("../models");

module.exports = function(app) {
  //Home Page
  //=======================================================
  app.get("/", function(req, res) {
        db.AllPark.findAll({}).then(function(dbPark) {
       
        var hbsObject = {
          parks: dbPark,
          home: {selected : true}
        };
         res.render("index", hbsObject);
               
        
      });
  }); 

  //Parks A-Z 
  //====================================================== 
  app.get("/all-parks", function(req, res) {
      db.AllPark.findAll({        
        order:  ["parkName"]
          
      }).then(function(dbPark) {
      var hbsObject = {
        parks: dbPark,
        az : {selected : true}
      };
         
      res.render("all-parks", hbsObject);
      });
  });

  //All Features
  //=====================================================
  app.get("/all-features", function(req, res) {
    db.AllPark.findAll({}).then(function(dbPark) {
    var hbsObject = {
      parks: dbPark,
      feat : {selected : true}
    };
        
    res.render("all-features", hbsObject);
    });
  });

  //About
  //=====================================================
  app.get("/about", function(req, res) {
    db.AllPark.findAll({
      order:  ["parkName"]
    }).then(function(dbPark) {
    var hbsObject = {
      parks: dbPark,
      about : {selected : true}
    };              
      res.render("about", hbsObject);
    });
  });

  //Add Park
  //===================================================== 
  app.get("/add-park", function(req, res) {
      db.AllPark.findAll({}).then(function(dbPark) {
      var hbsObject = {
        parks: dbPark,
        add : {selected : true}
      };
              
      res.render("add-park", hbsObject);
      });
  });

  //Individual Feature Page
  //=====================================================
  app.get("/features/:feature", function(req, res) {
    var feature = req.params.feature;
    var whereClause = {};
    console.log(feature);
    switch(feature) {
      case "basketball":          
      whereClause = {basketball : true}; 
      break;

      case "dogPark":
      whereClause = {dogPark : true};    
      break;

      case "golf":
      whereClause = {golf : true};    
      break;

      case "handiAcces":
      whereClause = {handiAcces : true};    
      break;

      case "playground":
      whereClause = {playground : true};    
      break;

      case "soccer":
      whereClause = {soccer : true};    
      break;

      case "tennis":
      whereClause = {tennis : true};    
      break;

      case "trails":
      whereClause = {trails : true};    
      break;

      case "vendingMachines":
      whereClause = {vendingMachines : true};    
      break;

      case "views":
      whereClause = {views : true};    
      break;

      case "waterSports":
      whereClause = {waterSports : true};    
      break;

      case "workoutGear":
      whereClause = {workoutGear : true};    
      break;

      case parkName:
      whereClause = {parkName : req.param.body}
        
     
    }
    db.AllPark.findAll({  
      where: whereClause,  
      order: ["parkName"]
    }).then(function(dbPark) {     
      var hbsObject = {
        parks: dbPark,
        layout: "main"
      };
     
      res.render("feature", hbsObject);
              
      });
  });

  //Individual Park Page 
  //=====================================================

  app.get("/:name", function(req, res) {
      db.AllPark.findOne({
        where: {
          parkName : req.params.name
        }        
      }).then(function(dbPark) {     
      var hbsObject = {
        parks: dbPark
      };
  
              
      res.render("park", hbsObject);
    });
  });
 

  // API Post
  //======================================================= 

  app.post("/api/parks", function(req, res) {
      db.AllPark.create(req.body).then(function(dbPark) {
      res.json(dbPark);    
    });
  }); 



};
