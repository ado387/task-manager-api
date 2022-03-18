const mongoose  = require( 'mongoose' );
const validator = require( 'validator' );

mongoose.connect( 'mongodb://127.0.0.1:27017/task-manager-api' );

const User = mongoose.model( 'User', {
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate( value ) {
			if ( ! validator.isEmail( value ) ) {
				throw new Error( 'Email is invalid' );
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
		validate( value ) {
			// Use minlength dummy :)
			// if ( value.length < 7 ) {
			// 	throw new Error( 'Password must contain at least 7 characters' );
			// }

			if ( value.includes( 'password' ) ) {
				throw new Error( "Password must not contains word 'password'" );
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate( value ) {
			// This is useless because value is already coerced to number by this point.
			// if ( typeof value !== 'number' ) {
			// 	console.log( 'typeof error');
			// 	throw new Error( 'Age must be a number' );
			// }

			if ( value < 0 ) {
				throw new Error( 'Age must be a positive number' );
			}
		}
	}
});

const me = new User({
	name: ' Adnan   ',
	email: '   adnan@gmail.COM ',
	password: '123456',
});

// me.save().then( () => {
// 	console.log( me );
// }).catch( error => {
// 	console.log( 'Error ', error );
// });

const Task = mongoose.model( 'Task', {
	description: {
		type: String,
		required: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	}
})

const newTask = new Task({
	description: '    Finish nodejs challange  ',
});

newTask.save().then( result => {
	console.log( result );
}).catch( error => {
	console.log( error );
});
