
const mongodb = require( 'mongodb' );
const { MongoClient, ObjectId } = mongodb;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName  = 'task-manager';

// Generate your own document id - rarely needed if ever.
// const id = new ObjectId();

// console.log( 'ID: ', id );
// console.log( 'timestamp: ', id.getTimestamp() );

MongoClient.connect( connectionURL, { useNewUrlParser: true }, ( error, client ) => {
	if ( error ) {
		console.log( 'Unable to connecto to database' );
		return;
	}

	const db = client.db( databaseName );
	db.collection( 'users' ).insertOne({
		name: 'Grga',
		age: 35,
	}, ( error, result ) => {
		if ( error ) {
			console.log( 'Unable to insert user' );
			return;
		}

		console.log( result );
	});

	// db.collection( 'users' ).insertMany([
	// 	{
	// 		name: 'Medo',
	// 		age: 50,
	// 	},
	// 	{
	// 		name: 'Đedo',
	// 		age: 70,
	// 	}
	// ], ( error, result ) => {
	// 	if ( error ) {
	// 		console.log( 'Unable to insert users' );
	// 		return;
	// 	}

	// 	console.log( result );
	// });

	// db.collection( 'tasks' ).insertMany([
	// 	{
	// 		description: 'Finish clickup tasks',
	// 		completed: false,
	// 	},
	// 	{
	// 		description: 'Work on NodeJS',
	// 		completed: true,
	// 	},
	// 	{
	// 		description: 'Get started with mongodb',
	// 		completed: true,
	// 	},
	// ], ( error, result ) => {
	// 	if ( error ) {
	// 		console.log( 'Unable to insert users' );
	// 		return;
	// 	}

	// 	console.log( result );
	// });
});
