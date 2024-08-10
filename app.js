/*Librerias*/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mod_fs = require('fs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const bodyParser = require("body-parser"); 


//const bootstrap_icons = require(`bootstrap-icons`)


/*Declaración de las rutas*/
// const LoginRouter = require('./routes/Login');
const LoginRouter = require('./routes/Login');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productoRouter = require('./routes/producto');
const categoriaRouter= require('./routes/categoria');
const historialRouter= require('./routes/historial');


const { default: mongoose } = require('mongoose');
/*Conexión a Base de Datos*/
const ENV = require("./config/envConfig")

mongoose.connect(ENV.MONGODB , {
    // mongoose.set('useFindAndModify', false);
    // mongoose.set('useUnifiedTopology', true);
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
const app = express();

/*Config de Cors */
const allowedOrigins = ["*"];

const options = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
      ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    origin: allowedOrigins
};
app.use(cors(options));


/*Jason Web Token */



app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*Declaración de uso de dependencias visuales*/ 
app.use("/",express.static("./node_modules/bootstrap/dist/"));
app.use("/",express.static("./node_modules/@popperjs/core/dist"));
app.use("/",express.static("./node_modules/bootstrap-icons/font"));



//RUTAS
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/producto', productoRouter);
app.use('/categoria', categoriaRouter);
app.use('/historial',historialRouter);
app.use('/login', LoginRouter);
//app.use('/tablas', usersRouter);

/*Recibir datos de formulario*/
//app.put('Actualizar:nombreTabla', (req, res)=>{})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  
  
  res.redirect('/');
  next();
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
