var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:8888/people-like-you' , function(error, response, body) {
        expect(body).to.equal('{\n    "peopleLikeYou": []\n}');
        done();
    });
});

it('Main page content', function(done) {
    request('http://localhost:8888/people-like-you?age=1000' , function(error, response, body) {
        expect(body).to.equal('{\n    "peopleLikeYou": []\n}');
        done();
    });
});

it('Main page status', function(done) {
    request('http://localhost:8888/people-like-you', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});