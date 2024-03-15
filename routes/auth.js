const express = require("express");
const router = express.Router();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SITE_URL}/auth/google/callback`,
    
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });

    const user = {
      id: profile._json.sub, 
      first_name:profile._json.givenName,
      last_name:profile._json.family_name,
      email:profile._json.email,
      avatar: profile._json.picture,
    };
      return done(null, user);
  }
));

router.get('/login', function(req, resp) {
  resp.render('login');
});

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/callback', 
passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect:'/'
}))

/*serialisation de l'utilisateur connecté qu'on veut renvoyer au client*/
passport.serializeUser(function(user, cb) {
  process.nextTick(function(){
    cb(null, user)
  })
});
passport.deserializeUser(function(id, cb) {
  process.nextTick(function(){
    cb(null, id)
  })
});
module.exports = router;