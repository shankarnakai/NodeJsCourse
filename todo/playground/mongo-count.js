const {MongoClient, ObjectID} = require('mongodb')

const config = {
		dbName:'TodoApp',
		toString: function() {
				let domain = 'localhost', 
					port = '27017', 
					dbName = ''

				if(!this.dbName || this.domain == '') {
						throw new Error('It is required to inform the dbName');
				}

				if(this.domain && this.domain != '') {
						domain = this.domain
				}	

				if(this.port && this.port !=''){
						port = this.port
				}
				return `mongodb://${domain}:${port}/${dbName}`
		}
} 

try{
		MongoClient.connect(config.toString(),(err, client) => {
				if(err) {
						return console.error('Unexpected error to connect on MongoDB server:', err.message)
				}

				console.log('Connected to MongoDB', config.dbName)
				const db = client.db(config.dbName)


				fetchDataTodo(db, (err, docs) => {
						if(err) {
								return console.log('Unexpected error to fetch data:', err)
						}

						db.collection('Todos').find().count().then((count) => {
								console.log('Find', count, 'itens')

								console.log('*'.repeat(8),'TODOS', '*'.repeat(8))
								if(docs.length == 0) {
										return console.log('The list of todos is empty')
								}

								for (let i = 0; i < docs.length; i+=1) {
										render(docs[i])
								}
						}, (err) => {
							console.log('Unexpected error:', err)
						})

						client.close()
				})
		})
} catch(e) {
		console.log('Unexpected error:', e.message)
}

function render(doc) {
		console.log(`Task : ${doc.name} | completed: ${doc.completed}`)
}

function fetchDataTodo(db, result) {
		db.collection('Todos').find().toArray().then((docs) => {
				result(null, docs)	
		}, (err) => {
				result(err, null)
		})
}
