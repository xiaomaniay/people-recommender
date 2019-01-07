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

    return [age, latitude, longtitude, monthlyIncome, experienced];

};

// Calculate the similarity between investors and the user.
function calcSimil (params) {

}
module.exports.extractParam = extractParam;
module.exports.calcSimil = calcSimil;