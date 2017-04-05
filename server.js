// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Articles Schema
var Articles = require("./models/Articles");

// Create Instance of Express
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

// MongoDB Configuration configuration (Change this URL to your own DB)
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

// This is the route we will send GET requests to retrieve our article data.
// We will call this route the moment our page gets rendered
app.get("/api/saved", function(req, res) {

  // We will find all the records
  Articles.find({}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each search.
app.post("/api/saved", function(req, res) {
  console.log("BODY: " + req.body);

  // Here we'll save an article to the database.
  // We'll use Date.now() to always get the current date time
  Articles.create({
    title: req.body.title,
    date: Date.now(),
    url: req.body.url,
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Article");
    }
  });
});

app.delete("/api/saved", function(req, res) {
// Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Articles.remove({ "_id": req.params.id }, function (err) {
    if (err) return handleError(err);
    // removed!
  });
}

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
Contact GitHub API Training Shop Blog About
