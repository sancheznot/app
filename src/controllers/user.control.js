const usersCtrls = {};
const User = require('../models/Users');

usersCtrls.renderSignUpForm = (req, res) => {
    res.render('users/signup');
;}

usersCtrls.signup = async (req, res) => {
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: 'Passwords do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'Password must be at least 4 characters'});
    }
    if(errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password

        })
    }else{
       const emailUser = await User.findOne({ email: email});
        if(emailUser){
            req.flash('error_msg', 'The email is already use');
            res.redirect('/users/signup');

        }else{
            const NewUsers = new User({name, email, password});
            NewUsers.password = await NewUsers.encryptPassword(password);
            await NewUsers.save();
            req.flash('success_msg', 'User are registered successfully')
            res.redirect('/users/signin');
        }
    }
    
};

usersCtrls.renderSignInform = (req, res) => {
    res.render('users/signin');
}

usersCtrls.signin = (req, res) => {
    res.send('signin');
}

usersCtrls.logout = (req, res) => {
    res.send('logout');
}

module.exports = usersCtrls;