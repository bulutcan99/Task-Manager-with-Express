const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/notfound');
const errorHandler = require('./middleware/errorhandler');



// Middleware
app.use(express.static('./public'));  // This is the middleware that will allow us to serve static files.
app.use(express.json());  // This is the middleware that will allow us to accept data in the body of the request.

// Routes Test

app.use('/api/v1/tasks', tasks);  // This is the route that will be route for task router.
app.use(notFound);  // This is the middleware that will allow us to handle 404 errors.
app.use(errorHandler);  // This is the middleware that will allow us to handle 500 errors.

const port = process.env.PORT || 3000;      // This is the port that the server will listen on.


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening the port ${port}.`));
    } catch (error) {
        console.log(error);
    } 
};

start();
