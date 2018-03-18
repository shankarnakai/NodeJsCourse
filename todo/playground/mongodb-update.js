const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
				if(err) {
								console.log('Unable to connect to MongoDB server')
								return console.error(err)
				}

				console.log('Connect to MongoDB server')
				const db = client.db('TodoApp')

				db.collection('Todos').findOneAndUpdate({
						_id : new ObjectID('5aac378947b98b30a0cbbad3')
				}, {
						$set: {
								completed: true
						}, 
						$inc: {
								item: 1
						}

				}, {
						returnOriginal: false
				}).then((doc) => {
					console.log(doc)
				})

				client.close();
})
