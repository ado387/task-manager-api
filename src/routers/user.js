
const express = require( 'express' );
const User = require( '../models/user' );
const router  = new express.Router();

router.get( '/users', async ( req, res ) => {

	try {
		const users = await User.find( {} );
		res.send( users );
	}
	catch( e ) {
		res.status( 500 ).send();
	}
});

router.get( '/users/:id', async ( req, res ) => {
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

router.post( '/users', async ( req, res ) => {
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

router.patch( '/users/:id', async ( req, res ) => {
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

router.delete( '/users/:id', async ( req, res ) => {
	try {
		const user = await User.findByIdAndDelete( req.params.id );

		if ( ! user ) {
			res.status( 404 ).send()
			return;
		}

		res.send( user );
	} catch (error) {
		res.status( 500 ).send();
	}
});

module.exports = router;
