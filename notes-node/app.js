const yargs = require('yargs');
const notes = require('./notes');

// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function(err) {
	// handle the error safely
	console.log(err)
});

process.on('exit', function(code) {
	if(code > 0) {
		return console.log(`About to exit with code ${code}`);
	}
});

//Settings
notes.setFilename("notable.json");

//Initialize and configure yargs
yargs
	.version()
	.usage('$0 <cmd> [args]')
	.command(['list', 'l'],'show all notes',{}, (args)=>{
		notes.getAll((err, notes) => {
			console.log("Show all content");

			console.log("----------------------------------------------------------------------------------------------------");
			for(i=0;i < notes.length; i += 1) {
				n = notes[i];
				console.log(`${n.id} - ${n.title}`);
				console.log(`\t${n.message}`);
				console.log("----------------------------------------------------------------------------------------------------");
			}
		});
	})
	.command(['add', 'a'],'add a note',{
		title:{
			describe: "title of note",
			alias: "t",
			demand:true
		},
		message:{
			describe: "Message of note",
			alias: "m",
			demand:true
		}
	}, (args) => {
		debugger;
		notes.add(args.title, args.message, (err) => {
			if(err) {
				console.log(err);
				process.exit(1);
			} 

			console.log("Note added !!");
		});
	})
	.command('update','update a note',{
		id:{
			describe: "ID of note",
			demand:true,
			type: "number"
		},

		title:{
			describe: "title of note",
			alias: "t",
			demand:true
		},
		message:{
			describe: "Message of note",
			alias: "m",
			demand:true
		}
	}, (args) => {
		note = {
			id: args.id,
			title: args.title, 
			message : args.message,
		}
		notes.update(note, (err) => {
			if(err) {
				console.log(err);
				process.exit(1);
			} 

			console.log("Note update !!");
		});
	})
	.command('remove','remove a note',{
		id:{
			describe: "ID of note",
			demand:true,
			type: "number"
		},
	}, (args)=> {
		notes.remove(id, (err, note) => {
			if(err) {
				console.log(err);
				process.exit(1);
			} 

			console.log("Note removed ${note} !!");
		});
	})
	.demandCommand(1, 'You need at least one command before moving on')
	.help('h')
	.alias('h', 'help')
	.epilogue('for more information, find the documentation at https://shankar.nakai.io.github.com')
	.argv;


/*
const args= yargs.argv;

if(args._.length < 0) {
	yargs.showHelp();
	process.exit(1);
} 

const commands = args._;
*/
