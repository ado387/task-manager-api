
const express = require( 'express' );
const multer  = require( 'multer' );
const User    = require( '../models/user' );
const auth    = require( '../middleware/auth' );

const router       = new express.Router();
const multerAvatar = multer({
	limits: {
		fileSize: 1000000, // Milion bytes, 1MB
	},
	fileFilter( req, file, cb ) {
		if ( ! file.originalname.match( /\.(jpg|jpeg|png)$/ )) {
			cb( new Error( 'File must be either jpg, jpeg, or png.' ) );
			return;
		}
		
		cb( undefined, true );
	}
});


/****************************
 * GET Requests
 ****************************/
router.get( '/users/me', auth, async ( req, res ) => {
	res.send( req.user );
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

router.get( '/users/:id/avatar', async( req, res ) => {
	try {
		const user = await User.findById( req.params.id );

		if ( ! user || ! user.avatar ) {
			throw new Error();
		}

		res.set( 'Content-Type', 'image/jpg' );
		res.send( user.avatar );
	} catch (error) {
		res.status( 404 ).send();
	}
});


/****************************
 * POST Requests
 ****************************/
router.post( '/users', async ( req, res ) => {
	const user  = new User( req.body );

	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status( 201 ).send( { user, token } );
	}
	catch( e ) {
		res.status( 400 ).send( e );
	}
});

router.post( '/users/login', async ( req, res ) => {
	try {
		const user  = await User.findByCredentials( req.body.email, req.body.password );
		const token = await user.generateAuthToken();
		res.send( { user, token } );
	} catch (error) {
		res.status( 400 ).send();
	}
});

router.post( '/users/logout', auth, async( req, res ) => {
	try {
		req.user.tokens = req.user.tokens.filter( token => token.token !== req.token );
		await req.user.save();

		res.send();
	} catch (e) {
		res.status( 500 ).send();
	}
});

router.post( '/users/logoutAll', auth, async ( req, res ) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (error) {
		res.status( 500 ).send();
	}
});

router.post( '/users/me/avatar', auth, multerAvatar.single( 'avatar' ),	async ( req, res ) => {
		req.user.avatar = req.file.buffer;
		await req.user.save();
		res.send();
	}, ( error, req, res, next ) => {
		res.status( 400 ).send( { error: error.message } );
	}
);

/****************************
 * UPDATE Requests
 ****************************/
router.patch( '/users/me', auth, async ( req, res ) => {
	// Validate updated fields.
	const updates          = Object.keys( req.body );
	const allowedUpdates   = [ 'name', 'email', 'password', 'age' ];
	const isValidOperation = updates.every( update => allowedUpdates.includes( update ) );

	if ( ! isValidOperation ) {
		res.status( 400 ).send( { error: 'Invalid updates' } );
		return;
	}

	// Try to apply updates.
	try {
		updates.forEach( update => req.user[update] = req.body[update] );
		await req.user.save();
		res.send( req.user );
	}
	catch ( e ) {
		res.status( 400 ).send();
	}
});


/****************************
 * DELETE Request
 ****************************/
router.delete( '/users/me', auth, async ( req, res ) => {
	try {
		await req.user.remove();
		res.send( req.user );
	} catch (error) {
		res.status( 500 ).send();
	}
});

router.delete( '/users/me/avatar', auth, async( req, res ) => {
	req.user.avatar = undefined;
	await req.user.save();
	res.send();
});

module.exports = router;
