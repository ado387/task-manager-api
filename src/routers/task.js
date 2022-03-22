const express = require( 'express' );
const Task = require( '../models/task' );
const auth = require( '../middleware/auth' );
const router = new express.Router();

// GET tasks?completed=true
// GET tasks?limit=10&skip=0
// GET tasks?sortBy=createdAt_desc
router.get( '/tasks', auth, async ( req, res ) => {
	const match = {};
	const sort  = {};

	if ( req.query.completed ) {
		match.completed = req.query.completed === 'true' ? true : false;
	}

	if ( req.query.sortBy ) {
		const parts = req.query.sortBy.split(':');
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
		sort[parts[1]] = parts[1];
	}

	try {
		// const tasks = await Task.find( { owner: req.user._id } );
		await req.user.populate({
			path: 'tasks',
			match,
			options: {
				limit: parseInt( req.query.limit ),
				skip: parseInt( req.query.skip ),
				sort,
			}
		});
		res.send( req.user.tasks );
	}
	catch( e ) {
		res.status( 500 ).send();
	}
});

router.get( '/tasks/:id', auth, async ( req, res ) => {
	const _id = req.params.id;

	try {
		const task = await Task.findOne( { _id, owner: req.user._id } );
		console.log( task );

		if ( ! task ) {
			res.status( 404 ).send();
			return;
		}

		res.send( task );
	} catch ( e ) {
		res.status( 500 ).send();
	}
});

router.post( '/tasks', auth, async ( req, res ) => {
	// const task = new Task( req.body );
	const task = new Task({
		...req.body,
		owner: req.user._id,
	});

	try {
		const result = await task.save();
		res.status( 201 ).send( result );
	}
	catch ( e ) {
		res.status( 400 ).send();
	}
});

router.patch( '/tasks/:id', auth,  async ( req, res ) => {
	const updates         = Object.keys( req.body );
	const allowedUpdates  = [ 'description', 'completed' ];
	const isAllowedUpdate = updates.every( update => allowedUpdates.includes( update ) );

	if ( ! isAllowedUpdate ) {
		res.send( { error: 'Invalid updates' } );
		return;
	}

	try {
		const task = await Task.findOne( { _id: req.params.id, owner: req.user._id } );

		if ( ! task ) {
			res.status( 404 ).send();
			return;
		}

		updates.forEach( update => task[update] = req.body[update] );

		await task.save( req.body );

		if ( ! task ) {
			res.status( 404 ).send();
			return;
		}

		res.send( task );
	} catch ( e ) {
		res.status( 400 ).send();
	}
});

router.delete( '/tasks/:id', auth, async ( req, res ) => {
	try {
		const task = await Task.findOne( { _id: req.params.id, owner: req.user._id } );

		if ( ! task ) {
			res.status( 404 ).send();
			return;
		}

		await task.remove();

		res.send( task );
	} catch (error) {
		res.status( 500 ).send();
	}
});

module.exports = router;
