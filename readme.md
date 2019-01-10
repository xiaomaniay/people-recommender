# BAMBU Backend Engineer Test

The People-Like-You API sends 10 potential investors similar with the person described in the query parameters.

- the endpoint is exposed at `people-like-you`
- each of the terms in the query parameters is optional
- the endpoint returns a JSON response with an array of scored suggested matches
    - the suggestions are sorted by descending score
    - each suggestion has a score between 0 and 1 indicating confidence in the suggestion (1 is most confident)

#### Main features
1. If there is no query parameter, the json response would be empty.
  - Sample query: /people-like-you

2. If the parameters seem unlikely and no match found, the response would be empty json file.
  - Sample query: /people-like-you?age=1000

3. If there are matches found, the json response would contain 10 elements sorting from the highest score to the lowest.
  - Sample query: /people-like-you?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false

4. User can specify which parameter should have the highest weight. Then the matching algorithm will give the specified parameter highest weight.
  - Sample query: http://localhost:8888/people-like-you?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false&most=monthlyIncome