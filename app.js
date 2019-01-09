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
  var query = req.query
  var reslt = {"peopleLikeYou": ''};
  reslt["peopleLikeYou"] = recommender.peopleLikeYou(query);
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(reslt, null, 4));
  // res.sendFile('index.html');
})

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
