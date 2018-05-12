
var db = require("../models");

module.exports = function(app) {
app.get("/api/parks", function(req, res) {
    db.ALLPark.findAll({}).then(function(dbPark) {
        var parkObject = {
            parks: dbPark
        };
        res.json("parks", parkObject);
    });
});
};




// case "dogPark":
// whereClause = {dogPark : true};    
// break;










//create a new api routes that strictly works in the backend,
//    /api/parks-app.get for this route, that will go into
//db.park.findall and res.json
//then we go to googlemaps.js, create an ajax call to call the api route
//on success, add markers


//