const express = require( 'express' );

require( './src/db/mongoose' );

const Task = require( './src/models/task' );
const User = require( './src/models/user' );

const UserRouter = require( './src/routers/user' );
const TaskRouter = require( './src/routers/task' );

const app  = express();
const port = process.env.PORT || 3000;


app.use( express.json() );
app.use( UserRouter );
app.use( TaskRouter );


app.listen( port, () => {
	console.log( `Server is listening on port ${port}.`);
});
