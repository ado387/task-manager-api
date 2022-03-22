const mongoose  = require( 'mongoose' );

const taskSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	}
}, {
	timestamps: true,
});

// taskSchema.pre( 'save', function( next ) {
// 	const task = this;

// 	task.description = task.description.toUpperCase();

// 	next();
// });

const Task = mongoose.model( 'Task', taskSchema );

module.exports = Task;
