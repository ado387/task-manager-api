
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
	
	// db.collection( 'users' ).deleteMany({
	// 	age: 38,
	// }).then( result => {
	// 	console.log( result );
	// }).catch( error => {
	// 	console.log( error );
	// });

	db.collection( 'tasks' ).deleteOne({
		description: 'Finish clickup tasks'
	}).then( result => {
		console.log( result );
	}).catch( error => {
		console.log( result );
	})
});
