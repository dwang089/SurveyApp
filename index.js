const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys.js')

const app = express();

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClienSecret,
  callbackURL: '/auth/google/callback'  
}, (accessToken, refreshToken, profile, done) => {
  console.log('access token: ', accessToken);
  console.log('refresh token: ', refreshToken);
  console.log('profile: ', profile);
}));

app.get('/auth/google', passport.authenticate('google', {
  scope: ['email']    
}));

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5001;
app.listen(PORT);
