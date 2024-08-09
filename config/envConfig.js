
require('dotenv').config()

// console.log(process.env.NODE_ENV);
// console.log(path.resolve( process.env.NODE_ENV + '.env'));




module.exports =  {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  PORT: process.env.PORT_BACK || 3013,
  MONGODB: process.env.MONGODB || "",



  DIR_FILE:process.env.DIR_FILE || '/down',
  URL_KONG: process.env.URL_KONG || 'https://api2.test.mesos.cl',
  // TZ:process.env.TZ || 'America/Santiago'


}

const JWT_SECRET=process.env.JWT_SECRET; 

const JWT_EXPIRES=process.env.JWT_EXPIRES;