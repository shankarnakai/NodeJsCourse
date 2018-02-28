const fs = require('fs'); 

let filename = "data.json";

const setFilename = (name) => {
	filename = name; 
}

const add = (title, message, done) => {
	done = done || (() => { console.log("Default console log");});

	if(!title || title == "") {
		done(new Error("Title is empty"));
		return;
	}

	if(!message || message == "") {
		done(new Error("Message is empty"));
		return;
	}

	console.log(`Adding Notes "${title}" => "${message}"`);
	getData((err, data) => {
		if( err) {
			done(err);
			return;
		}

		data = data || [];

		let id = generateUniqID();
		let note = {
			id,
			title, 
			message
		}

		data.push(note);

		saveData(data, (err) => {
			if(err) {
				done(err);
				return
			}
			done(null, id);
		});

	});
}

const update = (note, done) => {
	done = done || (() => {});

	if(!note.id || note.id == "" ) {
		//TODO: its not a number
		done(new Error("ID is empty"));
		return;
	}

	getData((err, data) => {
		if( err) {
			done(err);
			return;
		}

		if(data.length == 0) {
			done(new Error("Don't exist any data, please add first something"));
			return;
		}

		let position = find(data);

		if(position == -1) {
			done(new Error("Don't exist this ID"));
			return;
		}

		let original = data[position];
		if(original.id != id) {
			done(new Error("ID informed is divergent of find in data"));
		}

		if(note.title != "") {
			original.title = note.title;
		}

		if(note.message != "") {
			original.message = note.message;
		}

		data[position] = original;


		console.log(`Update Notes "${id}, ${title}" => "${message}"`);
		saveData(data, (err) => {
			if(err) {
				done(err);
				return
			}
			done();
		});

	});
}

const remove = (id, done) => {
	done = done || (() => {});

	if(!id || id == "" ) {
		//TODO: its not a number
		done(new Error("ID is empty"));
		return;
	}

	getData((err, data) => {
		if( err) {
			done(err);
			return;
		}

		if(data.length == 0) {
			done(new Error("Don't exist any data, please add first something"));
			return;
		}

		let position = find(data);

		if(position == -1) {
			done(new Error("Don't exist this ID"));
			return;
		}

		delete(data[position]);

		console.log(`Remove Note "${note.id}, ${note.title}" => "${note.message}"`);
		saveData(data, (err) => {
			if(err) {
				done(err);
				return
			}
			done(null, note);
		});
	});
}

const getAll = (done) => {
	done = done || (() => {});

	getData((err, data) => {
		if(err) {
			done(err);
			return;
		}

		done(null, data);
	});
}

const search = (criteria, done) => {
	done = done || (() => {});

	if(criteria) {
		done(new Error("No Criteria is especified"));
		return;
	}
	let list = [];

	done(null, list);
}



function generateUniqID(data) {
	if(!data || data.length == 0) {
		return 1;
	}
	return data[data.length].id + 1;
}

function getData(done) {
	fs.readFile(filename, (err, data) => {
		//if filename dont exist, return empty data
		if(err && err.code === 'ENOENT') {
			done(null, "");
			return;
		}

		done(err, JSON.parse(data));
	});
}

function find(id, data) {
	sorted = data.sort((a, b) => a.id - b.id);

	for(i=0;i < sorted.length; i+=1) {
		if(sorted[i] == id) {
			return 1;
		}
	}
	return -1;
}

function saveData(data, done) {
	dataStr = JSON.stringify(data)
	fs.writeFile(filename, dataStr, done);
}

module.exports = {
	setFilename,
	add,
	update,
	remove,
	getAll,
	search
}

