const request = require("request");

request({
	url: "https://maps.googleapis.com/maps/api/geocode/json?address=301-333%20S%20Federal%20St,%20Chicago,%20IL%2060604",
	json: true
}, (err, response, body) => {
	console.log(JSON.stringify(body, undefined, 2));
});
