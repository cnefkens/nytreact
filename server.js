// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Click schema
var Articles = require("./models/Articles");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
mongoose.Promise = Promise;

var databaseUri='mongodb://localhost/nytreact';

// Connect to localhost if not a production environment
if(process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else{
  mongoose.connect(databaseUri);
  // YOU CAN IGNORE THE CONNECTION URL BELOW (LINE 41) THAT WAS JUST FOR DELETING STUFF ON A RE-DEPLOYMENT
  //mongoose.connect('mongodb://heroku_60zpcwg0:ubn0n27pi2856flqoedo9glvh8@ds119578.mlab.com:19578/heroku_60zpcwg0');
}
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});
// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent click data.
// We will call this route the moment our page gets rendered
app.get("/api/saved", function(req, res) {

  // This GET request will search for the latest clickCount
  Articles.find({}).exec(function(err, data) {

    if (err) {
      console.log("Articles" + err);
    }
    else {
      //console.log("server /api get results " + data);
      res.send(data);
    }
  });
});

app.delete("/api/saved/:_id", function(req, res) {

  // This GET request will search for the latest clickCount
  console.log(req.params);
  Articles.findByIdAndRemove(req.params._id).exec(function(err, doc) {
     console.log("delete article");
    if (err) {
      console.log(err);
    }
    else {
      console.log("server /api get results " + doc);
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
app.post("/api/saved", function(req, res) {

  var title = req.body.title;
  var pubDt = req.body.pubDt;
  var url = req.body.url;

  // Note how this route utilizes the findOneAndUpdate function to update the clickCount
  // { upsert: true } is an optional object we can pass into the findOneAndUpdate method
  // If included, Mongoose will create a new document matching the description if one is not found
  Articles.findOneAndUpdate({
    title: title,
    pubDt: pubDt,
    url: url
  }, {
    $set: {
      title: title,
      pubDt: pubDt,
      url: url
    }
  }, { upsert: true }).exec(function(err, doc) {

    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});


// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
