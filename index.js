const express = require( 'express' );

require( './src/db/mongoose' );

const Task = require( './src/models/task' );

const app  = express();
const port = process.env.PORT || 3000;

app.use( express.json() );



/****************************
 * User routes
 ****************************/
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

app.patch( '/users/:id', async ( req, res ) => {
	// Validate updated fields.
	const updates = Object.keys( req.body );
	const allowedUpdates = [ 'name', 'email', 'password', 'age' ];
	const isValidOperation = updates.every( update => allowedUpdates.includes( update ) );

	if ( ! isValidOperation ) {
		res.status( 400 ).send( { error: 'Invalid updates' } );
		return;
	}

	// Try to apply updates.
	try {
		const user = await User.findByIdAndUpdate( req.params.id, req.body, { new: true, runValidators: true } );
		
		if ( ! user ) {
			res.status( 404 ).send();
			return;
		}

		res.send( user );
	}
	catch ( e ) {
		res.status( 400 ).send();
	}
});



/****************************
 * Task routes
 ****************************/
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
		res.status( 201 ).send( result );
	}
	catch ( e ) {
		res.status( 400 ).send();
	}
});

app.patch( '/tasks/:id', async ( req, res ) => {
	const updates         = Object.keys( req.body );
	const allowedUpdates  = [ 'description', 'completed' ];
	const isAllowedUpdate = updates.every( update => allowedUpdates.includes( update ) );

	if ( ! isAllowedUpdate ) {
		res.send( { error: 'Invalid updates' } );
		return;
	}

	try {
		const task = await Task.findByIdAndUpdate( req.params.id, req.body, { new: true, runValidators: true } );

		if ( ! task ) {
			res.status( 404 ).send();
		}

		res.send( task );
	} catch ( e ) {
		res.status( 400 ).send();
	}
});

app.listen( port, () => {
	console.log( `Server is listening on port ${port}.`);
});
