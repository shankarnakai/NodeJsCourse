const request = require("request");
const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");


const args = yargs
				.options({
								address: {
												demand: true, //it tell to cli that field is required 
												alias: 'a', // alias to this field
												describe: 'Address to fetch weather for', //Text to show in help
												string: true // convert the value to string
								}
				})
				.help()
				.alias('h','help')
				.argv;

geocode.coordinate(args.address)
				.then((geo) => {
								console.log(`The Address ${geo.address} have coordinates of (${geo.lat}, ${geo.lng})`);
								return weather.getWeather(geo.lat, geo.lng);
				})
				.then((temp) => {
								let celsius = {
												temperature : weather.fahrenheit2Celsius(temp.temperature, 2),
												apparentTemperature: weather.fahrenheit2Celsius(temp.apparentTemperature, 2)
								}

								console.log(`The temperature is of ${temp.temperature} F, but the feel is of ${temp.apparentTemperature} F`);
								console.log(`A temperatura é de ${celsius.temperature} C, mas a senscao de ${celsius.apparentTemperature} C`);
				})
				.catch((err) => {
								console.log(err);
				});
