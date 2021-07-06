const passport = require('passport');
const localStrategy = require('passport-local');

const User = require("../models/User");

// handles user registration
passport.use('signup', new localStrategy.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  }, async (request, username, password, done) => {
    try {
      const user = await User.create(username, password);
      return done(null, user);
    }
    catch (error) {
      return done(error);
    }
  }));

//handles user login
passport.use('login', new localStrategy.Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, async (username, password, done) => {
    try {
      const user = await User.findOne(username);
      if(!user) return done(new Error('username not found'), false);
  
      const validPass = await User.isValidPassword(user.id, password);
      if(!validPass) return done(new Error('password not found'), false);
  
      return done(null, user);
    }
    catch(error) {
      return done(error);
    }
  }));