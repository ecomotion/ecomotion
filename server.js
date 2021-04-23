const express = require('express');
const path = require('path');

const app = express();
const apiRouter = require('./server/routes/api.js');
const PORT = 3000;

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// handle requests for static files
app.use('/build', express.static(__dirname + '/build'));


// serve the app to main domain
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, './index.html'));
})


// api route handler
app.use('/api', apiRouter);


// 404 error handler for requests to unknown route
app.use((req, res) => res.status(404).send('Please try another page...'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT);
