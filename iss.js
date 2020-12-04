/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    const data = JSON.parse(body).ip; // they added a .ip after (body)
    console.log(data);
    return callback(error, data);

  });
};

const fetchCoordsByIP = function(ip, callback) {
  request('https://freegeoip.app/json/', (error, response, body) => {

    if (error) callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    const lat = JSON.parse(body).latitude;
    const lng = JSON.parse(body).longitude;
    return callback(null, { lat, lng });

  });
};
/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);

  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };