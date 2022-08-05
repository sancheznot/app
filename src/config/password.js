const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/Users');

passport.use(new localStrategy({
    usernameField: 'email',
    passportField: 'password'
}, async (email , password, done) => {

    // Math email's user
    const user = await User.findOne({email})
    if(!user) {
        return done(null, false, { message: 'User not found'});
    }else{
        // Match Password's Users
        const match = await user.matchPassword(password);
        if(match) {
            return done(null, user);
        }else{
            return done(null, false, { message: 'Incorrect Password'});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) =>{
        done(err, user);
    })
});
