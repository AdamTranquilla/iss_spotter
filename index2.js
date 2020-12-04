const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');

fetchMyIP()
  .then(fetchCoordsByIP) // why before previous then? why no ()?
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body));


