
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
	
	const updatePromise = db.collection( 'users' ).updateOne(
		{
			_id: new ObjectId( '6233139e2f707baa3c3da7b6' )
		},
		{
			$inc: {
				age: 3
			}
		}
	);

	updatePromise.then( result => {
		console.log( result );
	}).catch( error => {
		console.log( error );
	});

	const updateManyPromise = db.collection( 'tasks' ).updateMany(
		{
			completed: false,
		},
		{
			$set : {
				completed: true,
			}
		}
	).then( result => {
		console.log( result );
	}).catch( error => {
		console.log( error );
	});
});
