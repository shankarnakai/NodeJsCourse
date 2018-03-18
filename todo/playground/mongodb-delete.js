const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
				if(err) {
								console.log('Unable to connect to MongoDB server')
								return console.error(err)
				}

				console.log('Connect to MongoDB server')
				const db = client.db('TodoApp')

				//deleteMany
				db.collection('Todos').deleteMany({name: 'Eat Lunch'}).the((result)) => {
						console.log(result)
				}, (err) => {
						console.log(err)
				})

				//deleteOne
				db.collection('Todos').deleteOne({name: 'Eat Lunch'}).the((result)) => {
						console.log(result)
				}, (err) => {
						console.log(err)
				})
				//findOneAndDelete
				db.collection('Todos').findOneAndDelete({completed: false}).the((result)) => {
						console.log(result)
				}, (err) => {
						console.log(err)
				})
				//client.close();
})
