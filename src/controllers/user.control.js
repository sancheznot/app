const usersCtrls = {};

usersCtrls.renderSignUpForm = (req, res) => {
    res.render('users/singup');
;}

usersCtrls.signup = (req, res) => {
    res.send('Singup');
}

usersCtrls.renderSignInform = (req, res) => {
    res.render('users/singin');
}

usersCtrls.signin = (req, res) => {
    res.send('singin');
}

usersCtrls.logout = (req, res) => {
    res.send('logout');
}

module.exports = usersCtrls;