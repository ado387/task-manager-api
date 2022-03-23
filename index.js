const express = require( 'express' );

require( './src/db/mongoose' );

const Task = require( './src/models/task' );
const User = require( './src/models/user' );

const UserRouter = require( './src/routers/user' );
const TaskRouter = require( './src/routers/task' );

const app  = express();
const port = process.env.PORT || 3000;


const multer = require( 'multer' );
const upload = multer({
	dest: 'images',
	limits: {
		fileSize: 1000000, // Milion bytes, 1MB
	},
	fileFilter( req, file, cb ) {
		if ( ! file.originalname.match( /\.(doc|docx)$/ )) {
			cb( new Error( 'File must be a Word document.' ) );
			return;
		}
		
		cb( undefined, true );
	}
});

const errorMiddleware = ( req, res, next ) => {
	throw new Error( 'Please upload the word document.' );
	next();
}

app.post( '/upload', upload.single( 'upload' ), ( req, res ) => {
	res.send();
}, ( error, req, res, next ) => {
	res.status( 400 ).send( { error: error.message } );
});


app.use( express.json() );
app.use( UserRouter );
app.use( TaskRouter );


app.listen( port, () => {
	console.log( `Server is listening on port ${port}.`);
});
