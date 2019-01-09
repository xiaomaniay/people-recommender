// Generate JSON file.
const csvtojson = require('csvtojson');
const csvFileInput = 'data.csv';
const fs = require('fs');

// Convert the csv data to json.
try {
  fs.accessSync('./data.json')
} catch (e) {
  csvtojson()
  .fromFile(csvFileInput)
  .then((jsonObj)=>{
    fs.writeFileSync('data.json', JSON.stringify(jsonObj))
  })
}

// Creating the app.
var express = require('express');
var app = express();
var recommender = require('./recommender')

// Get method for

app.get('/people-like-you', function(req, res) {
  query = req.query
  recommdtn = recommender.peopleLikeYou(query)
  res.send(recommdtn);
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
