const express = require('express');
const path = require('path');

const app = express();
const apiRouter = require('./server/routes/api.js');
const PORT = 3000;
const sampleController = require('./server/sampleController.js');

const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');
const cookieParser = require('cookie-parser');

//so we can get info from cookies
app.use(cookieParser());

// handle parsing request body - both of these are from boiler plate
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle requests for static files
app.use('/build', express.static(__dirname + '/build'));

// serve the app to main domain
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, './index.html'));
});

// api route handler
app.use('/api', apiRouter);

/////////////////////////////////////// PASSPORT STARTS ////////////////////////////////////////

//Configure Session Storage -- this is part of passport
app.use(
  cookieSession({
    name: 'session-name',
    keys: ['key1', 'key2'],
  })
);

//Configure Passport
app.use(passport.initialize());
app.use(passport.session());

//don't really use this in our setup because it's hard to fake a bad password request. but this is boiler plate
app.get('/failed', (req, res) => {
  res.send('<h1>Log in Failed :(</h1>');
});

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

//we commented this out to take away the in between step for /flights path
//Protected Route.
// app.get('/profile', checkUserLoggedIn, (req, res) => {
//   res.redirect('/flights');
// });

//grab flights path
app.get('/flights', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

// Auth Routes -- boiler plate passport
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// main response path after successful login with google
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res, next) {
    //grabbing the user data from the google login
    const userData = {
      id: req.user.id,
      name: req.user.displayName,
      email: req.user.emails[0].value,
      ssid: req.cookies['session-name.sig'],
    };
    console.log(userData);
    //storing data into res.locals for access to add profile to users table in sql db
    res.locals.id = req.user.id;
    res.locals.name = req.user.displayName;
    res.locals.email = req.user.emails[0].value;
    res.locals.ssid = req.cookies['session-name.sig'];
    //this is kind of a strange path working around because we need to access the userInfo data to our addProfile middleware
    res.redirect('/flights');
    next();
  },
  //this middleware adds the userData to the users table in sql database
  sampleController.addProfile,
  (req, res) => {
    console.log('profile added into DB');
  }
);

//Logout -- don't really use this yet but it does log us out of OAuth
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

// route handler for viewing profile
app.get('/profile', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

// 404 error handler for requests to unknown route
app.use((req, res) => res.status(404).send('Please try another page...'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
