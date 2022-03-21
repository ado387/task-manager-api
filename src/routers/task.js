const express = require( 'express' );
const Task = require( '../models/task' );
const router = new express.Router();

router.get( '/tasks', async ( req, res ) => {

	try {
		const tasks = await Task.find( {} );
		res.send( tasks );
	}
	catch( e ) {
		res.status( 500 ).send();
	}
});

router.get( '/tasks/:id', async ( req, res ) => {
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

router.post( '/tasks', async ( req, res ) => {
	const task = new Task( req.body );

	try {
		const result = await task.save();
		res.status( 201 ).send( result );
	}
	catch ( e ) {
		res.status( 400 ).send();
	}
});

router.patch( '/tasks/:id', async ( req, res ) => {
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
			return;
		}

		res.send( task );
	} catch ( e ) {
		res.status( 400 ).send();
	}
});

router.delete( '/tasks/:id', async ( req, res ) => {
	try {
		const task = await Task.findByIdAndDelete( req.params.id );

		if ( ! taks ) {
			res.status( 404 ).send();
			return;
		}

		res.send( task );
	} catch (error) {
		res.status( 500 ).send();
	}
});

module.exports = router;
