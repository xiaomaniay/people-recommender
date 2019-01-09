// Extract query parameters.
function extractParam (query){

  var age = 0;
  var latitude = 0;
  var longitude = 0;
  var monthlyIncome = 0;
  var experienced = false;

  if (query.age) {age = query.age};
  if (query.latitude) { latitude = query.latitude};
  if (query.longitude) {longitude = query.longitude};
  if (query.monthlyIncome) {monthlyIncome = query.monthlyIncome};
  if (query.experienced) {experienced = query.experienced};

  return {age: age, latitude: latitude, longitude: longitude, monthlyIncome: monthlyIncome, experienced: experienced};

};

// Calculate the similarity between investors and the user.
function calcSimilarity (params) {
  const fs = require('fs');
  var calcData = [];
  // Load json data
  var rawData = fs.readFileSync('./data.json');
  var jsonData = JSON.parse(rawData);

  // Each aspect is assigned equal weight of 0.2.
  // Score for each aspect is calculated based on deviation. Larger deviation, less score.
  const math = require('math');
  const roundTo = require('round-to');
  const aspectScore = {age: 0.2, latitude: 0.2, longitude: 0.2, monthlyIncome: 0.2, experienced: 0.2};
  for (var i = 0; i < jsonData.length; i++) {
    people = jsonData[i];
    ageScore = math.max(aspectScore.age * (1 - math.abs((people.age - params.age) / params.age)), 0);
    latitudeScore = math.max(aspectScore.latitude * (1 - math.abs((people.latitude - params.latitude) / params.latitude)), 0);
    longitudeScore = math.max(aspectScore.longitude * (1 - math.abs((people.longitude - params.longitude) / params.longitude)), 0);
    monthlyIncomeScore = math.max(aspectScore.monthlyIncome * (1 - math.abs((people['monthly income'] - params.monthlyIncome) / params.monthlyIncome)), 0);
    experiencedScore = (people.experienced == params.experienced) ? aspectScore.experienced : 0;

    finalScore = roundTo(ageScore + latitudeScore + longitudeScore + monthlyIncomeScore + experiencedScore, 1);
    people['score'] = finalScore;
    console.log(people);
    if (people['score'] > 0) {
      calcData.push(people);
    }
  }
  
  return calcData;
};

function getRecordsWithHighestScore (dataWithScore) {
  // Sort data based on their score
  dataWithScore.sort(function(a, b) {
    return b.score - a.score;
  });

  return dataWithScore.slice(0, 10);
}

function peopleLikeYou (query) {
  params = extractParam(query);
  calcData = calcSimilarity(params);
  return getRecordsWithHighestScore(calcData);
}

module.exports.peopleLikeYou = peopleLikeYou;
