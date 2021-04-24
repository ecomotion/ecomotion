const express = require('express');
const path = require('path');

const app = express();
const apiRouter = require('./server/routes/api.js');
const PORT = 3000;

const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');

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


//Configure Session Storage
app.use(cookieSession({
  name: 'session-name',
  keys: ['key1', 'key2']
}))

//Configure Passport
app.use(passport.initialize());
app.use(passport.session());



app.get('/failed', (req, res) => {
  res.send('<h1>Log in Failed :(</h1>')
});

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
}

//Protected Route.
app.get('/profile', checkUserLoggedIn, (req, res) => {
  res.redirect('/');
});

// Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    res.redirect('/profile');
  }
);

//Logout
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})



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











app.listen(PORT, () => { console.log(`listening on port ${PORT}`) });
