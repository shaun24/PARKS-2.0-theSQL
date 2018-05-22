var db = require("../models");
var formidable = require("formidable");
var fs = require("fs");
var path = require("path");

module.exports = function(app) {

  // route to upload park images to the server
  app.post("/api/upload", function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var keys = Object.keys(files);
      var oldpath;
      var newpath;
      var pathArray = [];
      keys.forEach(function(item){
        oldpath = files[item].path;
        newpath = path.join(__dirname, "../public/assets/images/parks/", files[item].name);
        pathArray.push(newpath);
        fs.rename(oldpath, newpath, checkFinished);
      });

      var doneCount = 0;
      function checkFinished(){
        doneCount++;
        if(doneCount === keys.length){
          res.json(pathArray);
        };
      };
    });
  });

  // route to add a park to the database
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

  // route to add park features to the database
  app.post("/api/features", function (req, res) {
    db.Feature.bulkCreate(
      req.body.array
    ).then(function(dbFeature) {
      res.json(dbFeature);
    }).catch(function(err) {
      res.json(err);
    });
  });
  
};