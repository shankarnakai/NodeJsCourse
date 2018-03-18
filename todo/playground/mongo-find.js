const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
		if(err) {
				return console.error('Unable to connect to MongoDB server', err);
		}

		const db = client.db('TodoApp')

		// _id: new ObjectID('YOUR_ID')
		db.collection('Todos').find({completed: false}).toArray().then((docs) => {
				//docs is equals to row
				console.log('Todos')
				console.log(JSON.stringify(docs, undefined, 2))
		}, (err) => {
				console.log('Unable to fetch todos', err)
		})


		client.close()
})
