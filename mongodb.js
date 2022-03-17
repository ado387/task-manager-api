
const mongodb = require( 'mongodb' );
const { MongoClient, ObjectId } = mongodb;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName  = 'task-manager';


MongoClient.connect( connectionURL, { useNewUrlParser: true }, ( error, client ) => {
	if ( error ) {
		console.log( 'Unable to connecto to database' );
		return;
	}

	const db = client.db( databaseName );
	
	// db.collection( 'users' ).findOne( { _id: new ObjectId( '62330d88f0564fce68f8897a' ) }, ( error, user ) => {
	// 	if ( error ) {
	// 		console.log( 'Couldn\'t fetch user' );
	// 		return;
	// 	}

	// 	console.log( user );
	// });

	// db.collection( 'users' ).find( { age: 31 } ).toArray( ( error, users ) => {
	// 	console.log( users );
	// });

	// db.collection( 'users' ).find( { age: 31 } ).count( (error, users ) => {
	// 	console.log( users );
	// });

	// db.collection( 'tasks' ).findOne( { _id: new ObjectId( '62330ee74035574be9b292dd' ) }, ( error, user ) => {
	// 	if ( error ) {
	// 		console.log( 'Couldnt get user' );
	// 	}

	// 	console.log( user );
	// });

	db.collection( 'tasks' ).find( { completed: false } ).toArray( (error, tasks ) => {
		if ( error ) {
			console.log( 'Couldn\'t initiate search' );
			return;
		}

		console.log( tasks );
	})
});
