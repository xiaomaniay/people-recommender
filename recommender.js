// Extract query parameters.
function extractParam (query){

  var age = 0;
  var latitude = 0;
  var longtitude = 0;
  var monthlyIncome = 0;
  var experienced = false;

  if (query.age) {age = query.age};
  if (query.latitude) { atitude = query.latitude};
  if (query.longtitude) {longtitude = query.longtitude};
  if (query.monthlyIncome) {monthlyIncome = query.monthlyIncome};
  if (query.experienced) {experienced = query.experienced};

  return {age: age, latitude: latitude, longtitude: longtitude, monthlyIncome: monthlyIncome, experienced: experienced};

};

// Calculate the similarity between investors and the user.
function calcSimilarity (params) {
  const fs = require('fs');
  var calcData = [];
  // Load json data
  var rawData = fs.readFileSync('./data.json');
  var jsonData = JSON.parse(rawData)

  // Each aspect is assigned equal weight of 0.2.
  // Score for each aspect is calculated based on deviation. Larger deviation, less score.
  const math = require('math');
  const roundTo = require('round-to');
  const aspectScore = {age: 0.2, latitude: 0.2, longtitude: 0.2, monthlyIncome: 0.2, experienced: 0.2}
  for (people in jsonData) {
    ageScore = aspectScore.age - math.abs((people.age - params.age) / params.age)
    latitudeScore = aspectScore.latitude - math.abs((people.latitude - params.latitude) / params.latitude)
    longtitudeScore = aspectScore.longtitude - math.abs((people.longtitude - params.longtitude) / params.longtitude)
    monthlyIncomeScore = aspectScore.monthlyIncome - math.abs((people.monthlyIncome - params.monthlyIncome) / params.monthlyIncome)
    experiencedScore = aspectScore.monthlyIncome ? (people.experienced == params.experienced) : 0

    finalScore = roundTo(ageScore + latitudeScore + longtitudeScore + monthlyIncomeScore + experiencedScore, 1)
    people['score'] = finalScore;

    calcData.push(people)
  }
  return calcData
};

function getRecordsWithHighestScore (dataWithScore) {
  // Sort data based on their score
  dataWithScore.sort(function(a, b) {
    return a.score > b.score
  });

  return dataWithScore.slice(0, 10);
}

function peopleLikeYou (query) {
  params = extractParam(query);
  calcData = calcSimilarity(params);
  return getRecordsWithHighestScore(calcData);
}

module.exports.peopleLikeYou = peopleLikeYou;
