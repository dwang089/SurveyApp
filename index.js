const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys.js')
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
require('./user');

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

mongoose.connect(keys.mongoURI);
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClienSecret,
  callbackURL: '/auth/google/callback'  
}, (accessToken, refreshToken, profile, done) => {
  console.log('access token: ', accessToken);
  console.log('refresh token: ', refreshToken);
  console.log('profile: ', profile);

  User.findOne({ googleID: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        new User({ googleID: profile.id }).save()
          .then(user => done(null, user));
      }
    });
}));

app.get('/auth/google', passport.authenticate('google', {
  scope: ['email']    
}));

app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/api/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

app.get('/api/user', (req, res) => {
  res.send(req.user);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT);
