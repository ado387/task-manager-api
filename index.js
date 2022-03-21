const express = require( 'express' );

require( './src/db/mongoose' );

const User = require( './src/models/user');
const Task = require( './src/models/task' );

const app  = express();
const port = process.env.PORT || 3000;

app.use( express.json() );

app.get( '/users', async ( req, res ) => {

	try {
		const users = await User.find( {} );
		res.send( users );
	}
	catch( e ) {
		res.status( 500 ).send();
	}
});

app.get( '/users/:id', async ( req, res ) => {
	const _id = req.params.id;

	try {
		const user = await User.findById( _id );

		if ( ! user ) {
			res.status( 404 ).send();
			return;
		}

		res.send( user );
	}
	catch( e ) {
		res.status( 500 ).send();
	}
});

app.post( '/users', async ( req, res ) => {
	console.log( 'Request: ', req.body );

	const user   = new User( req.body );
	
	try {
		const result = await user.save();
		res.status( 201 ).send( result );
	}
	catch( e ) {
		res.status( 400 ).send( e );
	}
});

app.get( '/tasks', async ( req, res ) => {

	try {
		const tasks = await Task.find( {} );
		res.send( tasks );
	}
	catch( e ) {
		res.status( 500 ).send();
	}
});

app.get( '/tasks/:id', async ( req, res ) => {
	const _id = req.params.id;

	try {
		const task = await Task.findById( _id );

		if ( ! task ) {
			res.status( 404 ).send();
			return;
		}

		res.send( task );
	} catch ( e ) {
		res.status( 500 ).send();
	}
});

app.post( '/tasks', async ( req, res ) => {
	const task = new Task( req.body );

	try {
		const result = await task.save();

		if ( ! result ) {
			res.status( 400 ).send( result );
			return;
		}

		res.status( 201 ).send( result );
	}
	catch ( e ) {
		res.status( 500 ).send( e );
	}
});

app.listen( port, () => {
	console.log( `Server is listening on port ${port}.`);
});

