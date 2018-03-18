const express = require('express')
let app = express()

app.get("/", (request, response) => {
	response.status(200).send("The Polyglot Developer")
})

app.get('/test', (request, response) => {
	response.status(500).send({ 
		message: "This is an error response"
	})
})

const server = app.listen(3000, () => {
	console.log("Listening on port: " + server.address().port + "...");
})

module.exports = server
