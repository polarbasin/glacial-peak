const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/User.js');
const fbAuth = require('./auth').facebookAuth;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // https://github.com/jaredhanson/passport-facebook
  passport.use(new FacebookStrategy({
    clientID: fbAuth.clientID,
    clientSecret: fbAuth.clientSecret,
    callbackURL: fbAuth.callbackURL,
    profileFields: fbAuth.profileFields,
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'facebook.id': profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          console.log('user:', profile);
          const newUser = new User({
            facebook: {
              id: profile.id,
              displayName: profile.displayName,
              email: profile.email,
              firstName: profile.displayName.split(' ')[0],
              image: profile.photos[0].value,
            },
          });

          newUser.save((err) => {
            if (err) {
              console.error(err);
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
