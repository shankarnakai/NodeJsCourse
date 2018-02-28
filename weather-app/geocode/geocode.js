const request = require('request');

var geocodeAddress = (address) => {
	return new Promise((resolve, reject) => {
		let encodeAddress = encodeURIComponent(address);
		request({
			url: "https://maps.googleapis.com/maps/api/geocode/json?address="+encodeAddress,
			json: true
		}, (err, response, body) => {
			if(err) {
				reject("Unable to connect to Google servers");
			} else if(response.statusCode != 200) {
				reject("Unable to find that address (cod 1.0)");
			} else if(body.status !== "OK") {
				if(body.status === 'OVER_QUERY_LIMIT') {
					reject(body.error_message);
				} else if(body.status === 'ZERO_RESULTS') {
					reject("Unable to find that address (cod 1.1)");
				}

				let message = body.error_message + "( cod " + body.status + ")";
				reject(message);
			}
			console.log(body);

			let location = {
				address: body.results[0].formatted_address,
				lat: body.results[0].geometry.location.lat,	
				lng: body.results[0].geometry.location.lng	
			}
			resolve(location);
		});
	});	
}

module.exports = {
	coordinate: geocodeAddress
}

