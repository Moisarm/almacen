const mongoose = require('mongoose');


module.exports=()=>{
    
    const connect =()=>{

        mongoose.set('useFindAndModify', false);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(ENV.MONGODB_URI , {
            useNewUrlParser:true,
            useCreateIndex:true
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

    }

    connect();
} 