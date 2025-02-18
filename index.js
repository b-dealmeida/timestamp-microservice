// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/**
 * Takes a date object and returns an object with unix and utc timestamps
 */
function getTimestamp(date) {
  // Assemble and return timestamp formats
  return {"unix": date.getTime(), "utc": date.toUTCString()};
}

// Return current timestamp
app.get('/api', function(req, res) {
  res.json(getTimestamp(new Date()));
});

// Return timestamp from dateString request
app.get('/api/:dateString(\\d{4}-\\d{2}-\\d{2})', function(req, res) {
  res.json(getTimestamp(new Date(req.params.dateString)));
});

// Return timestamp from unix timestamp request
app.get('/api/:timestamp(-?\\d+)', function(req, res) {
  res.json(getTimestamp(new Date(parseInt(req.params.timestamp))));
});

// Invalid api call
app.get('/api/*', function(req, res) {
  res.json({"error": "Invalid Date"});
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
