// Extract query parameters.
function extractParam (query){

  return {age: query.age || 0, latitude: query.latitude || 0, longitude: query.longitude || 0, 
    monthlyIncome: query.monthlyIncome || 0, experienced: query.experienced || false, most: query.most || ''};

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
  const aspectScore = {age: 0.2, latitude: 0.2, longitude: 0.2, monthlyIncome: 0.2, experienced: 0.2};

  if (params.most != '') {
    var mostAspect = params.most;
    aspectScore[mostAspect] = aspectScore[mostAspect] * 2;
  }

  for (var i = 0; i < jsonData.length; i++) {
    people = jsonData[i];
    ageScore = math.max(aspectScore.age * (1 - math.abs((people.age - params.age) / params.age)), 0);
    latitudeScore = math.max(aspectScore.latitude * (1 - math.abs((people.latitude - params.latitude) / params.latitude)), 0);
    longitudeScore = math.max(aspectScore.longitude * (1 - math.abs((people.longitude - params.longitude) / params.longitude)), 0);
    monthlyIncomeScore = math.max(aspectScore.monthlyIncome * (1 - math.abs((people['monthly income'] - params.monthlyIncome) / params.monthlyIncome)), 0);
    experiencedScore = (people.experienced == params.experienced) ? aspectScore.experienced : 0;

    totalScore = (ageScore + latitudeScore + longitudeScore + monthlyIncomeScore + experiencedScore) / (aspectScore.age + aspectScore.latitude + aspectScore.longitude + aspectScore.monthlyIncome + aspectScore.experienced)
    people['score'] = totalScore;

    // console.log(people);
    if (people['score'] > 0) {
      calcData.push(people);
    }
  }
  
  return calcData;
};

function getRecordsWithHighestScore (dataWithScore) {
  // Sort data based on their score.
  dataWithScore.sort(function(a, b) {
    return b.score - a.score;
  });

  // Get 10 people with highest score.
  const roundTo = require('round-to');
  recommendtns = dataWithScore.slice(0, 10);
  recommendtns.forEach(function(recommendtn) {
    recommendtn.score = roundTo(recommendtn.score, 1);
  })
  return recommendtns
}

function peopleLikeYou (query) {
  params = extractParam(query);
  calcData = calcSimilarity(params);
  return getRecordsWithHighestScore(calcData);
}

module.exports.peopleLikeYou = peopleLikeYou;
