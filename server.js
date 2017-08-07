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
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
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

app.delete("/api/saved", function(req, res) {

  // This GET request will search for the latest clickCount
  console.log(req.params);
  Articles.remove({_id: req.params._id}).exec(function(err, data) {
     console.log("delete article");
    if (err) {
      console.log(err);
    }
    else {
      console.log("server /api get results " + data);
      res.send(data);
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
  }, { upsert: true }).exec(function(err, data) {

    if (err) {
      console.log(err);
    }
    else {
      res.send(data);
    }
  });
});


// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
