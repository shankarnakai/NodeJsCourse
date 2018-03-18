var request = require("request")

describe("Server", () => {
	var server;

	beforeAll(() => {
		server = require("../app")
	})

	afterAll(() => {
		server.close();
	})

	describe("GET /", () => {
		var data = {}
		beforeAll((done) => {
			request.get("http://localhost:3000/", (err, res, body) => {
				if(err) {
					throw new Error("Unexpected error:" + err.message);
				}

				data.status = res.statusCode
				data.body = res.body
				done()
			})
		})

		it("Status 200", () => {
			expect(data.status).toBe(200)
		})

		it("Body", () => {
			expect(data.body).toBe("The Polyglot Developer")
		})
	})


	describe("GET /test", () => {
		var data = {}
		beforeAll((done) => {
			request.get("http://localhost:3000/test", (err, res, body) => {
				if(err) {
					throw new Error("Unexpected error:" + err.message);
				}

				data.status = res.statusCode
				data.body = JSON.parse(res.body)
				done()
			})
		})

		it("Status 500", () => {
			expect(data.status).toBe(500)
		})

		it("Body", () => {
			expect(data.body.message).toBe("This is an error response")
		})
	})
});

