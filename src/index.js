const express = require( 'express' );

require( './db/mongoose' );

const Task = require( './models/task' );
const User = require( './models/user' );

const UserRouter = require( './routers/user' );
const TaskRouter = require( './routers/task' );

const app  = express();
const port = process.env.PORT;

app.use( express.json() );
app.use( UserRouter );
app.use( TaskRouter );


app.listen( port, () => {
	console.log( `Server is listening on port ${port}.`);
});
