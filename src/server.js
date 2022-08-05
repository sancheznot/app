// Utilizar el framework del servidor
// Requerimos el servidor en una constate llamada express
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodsOver = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// ejecutamos el modulo dentro de esta cons, esta funcion nos devuelve un objeto
// Initializations
const app = express();
require('./config/password');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs' );

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodsOver('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Globals Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));



// Static Files
app.use(express.static(path.join(__dirname,'public')));




// exportamos el modulo
module.exports = app;

