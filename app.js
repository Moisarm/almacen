var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const db = require('./config/DB');

//const bootstrap_icons = require(`bootstrap-icons`)



var LoginRouter = require('./routes/Login');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { default: mongoose } = require('mongoose');

const ENV = require("./config/envConfig")

// mongoose.set('useFindAndModify', false);
// mongoose.set('useUnifiedTopology', true);
mongoose.connect(ENV.MONGODB , {
    // useNewUrlParser:true,
    // useCreateIndex:true
})
    .then((db)=>{
        console.log(
            `DB is conected on: 
            Name:${db.connections[0].name}
            Host:${db.connections[0].host}
            Port:${db.connections[0].port}
            User:${db.connections[0].user}`
        )
        // console.info(`DB is conected on: 
        //     Name:${db.connections[0].name}
        //     Host:${db.connections[0].host}
        //     Port:${db.connections[0].port}
        //     User:${db.connections[0].user}`)
    }).catch(er=>{
        console.error(`Error al conectarme a la db`)
        console.error(er)

    })
// console.log(`HOLA`)
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(
 // express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
//);
app.use("/",express.static("./node_modules/bootstrap/dist/"));
app.use("/",express.static("./node_modules/@popperjs/core/dist"));
app.use("/",express.static("./node_modules/bootstrap-icons/font"));
app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/tablas', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
