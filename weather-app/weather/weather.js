const request = require("request"); 

const APIKEY = '262f0c86f3c6eba5e02d76455a999e3e';

var getWeather = (lat,lng) => {
				return new Promise((resolve, reject) => {
								request({
												url: `https://api.forecast.io/forecast/${APIKEY}/${lat},${lng}`,
												json:true
								}, (err, response, body) => {
												if (err) {
																reject('Unable to connect to Forecast.io server.');
												} else if (response.statusCode !== 200) {
																reject('Unable to fetch weather.');
																console.log(body);
												}

												resolve({
																temperature: body.currently.temperature,
																apparentTemperature: body.currently.apparentTemperature
												});
								});
				});
}

var fahrenheit2Celsius = (fahrenheit, precision) => {
		let celsius = (fahrenheit - 32)/1.8;
	  let power = Math.pow(10, precision || 0);
    return Math.round(celsius * power) / power
}

module.exports = {
				getWeather,
				fahrenheit2Celsius	
}
