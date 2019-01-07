// Generate JSON file.
const csvtojson = require('csvtojson');
const csvFileInput = 'data.csv';
const fs = require('fs');

csvtojson()
.fromFile(csvFileInput)
.then((jsonObj)=>{
  fs.writeFileSync('data.json', JSON.stringify(jsonObj))
})

// Creating the app.
var express = require('express');
var app = express();
var recommender = require('./recommender')

// Get method for 

app.get('/people-like-you', function(req, res) {
  query = req.query
  recommdtn = 
  res.send(recommdtn);
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});