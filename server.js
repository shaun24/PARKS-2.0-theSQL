var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var exphbs = require("express-handlebars");
var db = require("./models");


var PORT = process.env.PORT || 3000;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static("public"));
// app.use(express.static(process.cwd() + '/public'));


var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
      eq: function (a, b) { return a == b; },
    
  },
  defaultLayout: "main"
});
// app.use(express.static(process.cwd() + '/features'));
// Set Handlebars.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// Serve static content for the app from the "public" directory in the application directory.








//ROUTES 
//======================================================
require("./routes/routes.js")(app);
require("./routes/userRoutes.js")(app);//needs to atleast be above apiRoutes
require("./routes/dbroutes.js")(app);
require("./routes/apiRoutes.js")(app);


db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });

