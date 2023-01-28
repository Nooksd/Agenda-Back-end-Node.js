require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true} )
.then(() => {
    app.emit('ready');
})
const csrf = require('csurf');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const { middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');
// const helmet = require('helmet');
const sessionOptions = session({
    secret: 'sdkfmiosmfiowmfiomesoifmoimrgiodr',
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());
//app.use(helmet());
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(csrfMiddleware);
app.use(checkCsrfError);
app.use(middlewareGlobal);
app.use(routes);

app.on('ready', () => {
    app.listen(3000, () => {
        console.log('access: http://localhost:3000');
    });
})