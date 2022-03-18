const express = require( 'express' );

require( './src/db/mongoose' );

const User = require( './src/models/user');
const Task = require( './src/models/task' );

const app  = express();
const port = process.env.PORT || 3000;

app.use( express.json() );

app.get( '/users', ( req, res ) => {
	User.find( {} ).then( result => {
		res.send( result );
	}).catch( error => {
		res.status( 500 ).send();
	});
});

app.get( '/users/:id', ( req, res ) => {
	const _id = req.params.id;

	User.findById( _id ).then( user => {

		if ( ! user ) {
			res.status( 404 ).send();
		}

		res.send( user );

	}).catch( error => {
		res.status( 500 ).send();
	});
});

app.post( '/users', ( req, res ) => {
	console.log( 'Request: ', req.body );

	const user = new User( req.body );

	user.save().then( result => {
		res.status( 201 ).send( result );
	}).catch( error => {
		res.status( 400 ).send( error );
	});
});

app.get( '/tasks', ( req, res ) => {
	Task.find( {} ).then( tasks => {
		res.send( tasks );
	}).catch( error => {
		res.status( 500 ).send();
	});
});

app.get( '/tasks/:id', ( req, res ) => {
	const _id = req.params.id;

	Task.findById( _id ).then( task => {
		if ( ! task ) {
			res.status( 404 ).send();
		}

		res.send( task );
	}).catch( error => {
		res.status( 500 ).send();
	});
});

app.post( '/tasks', ( req, res ) => {
	const task = new Task( req.body );

	task.save().then( result => {
		res.status( 201 ).send( result );
	}).catch( error => {
		res.status( 400 ).send( error );
	});
});

app.listen( port, () => {
	console.log( `Server is listening on port ${port}.`);
});

