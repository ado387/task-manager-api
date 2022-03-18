const mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://127.0.0.1:27017/task-manager-api' );

const User = mongoose.model( 'User', {
	name: {
		type: String
	},
	age: {
		type: Number
	}
});

// const me = new User({
// 	name: 'Medo',
// 	age: false, // Watch out: implicit coercion.
// });

// me.save().then( () => {
// 	console.log( me );
// }).catch( error => {
// 	console.log( 'Error ', error );
// });

const Task = mongoose.model( 'Task', {
	description: {
		type: String
	},
	completed: {
		type: Boolean
	}
})

const newTask = new Task({
	description: 'Finish up ClickUp tasks',
	completed: false,
});

newTask.save().then( result => {
	console.log( result );
}).catch( error => {
	console.log( error );
});
