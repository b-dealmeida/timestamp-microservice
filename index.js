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

// Implements the timestamp api service. requests to /api/:date?
// are converted to a Date object and a timestamp is returned.
// If the given date is invalid an error is returned.
app.get('/api/:date?', function(req, res) {
  // Create Date object based on given date param
  var date;
  if(req.params.date == undefined) {
    // Date is undefined, return current timestamp
    date = new Date();
  } else if(req.params.date.match('^-?\\d+$')) {
    // Date is an integer, treat as unix timestamp
    date = new Date(parseInt(req.params.date));
  } else {
    /* Date is in another format, try to parse 
       by creating Date obj. */
    date = new Date(req.params.date);
  }

  if(date.toString() === 'Invalid Date') {
    // date conversion was unsuccessful, return error
    res.json({"error": "Invalid Date"});
  } else {
    // Convert to unix and utc timestamps and return
    res.json({"unix": date.getTime(), "utc": date.toUTCString()});
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
