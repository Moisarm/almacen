const mongoose = require('mongoose');
const categoria = require('./categoria');


const Schema = mongoose.Schema;

const ProductoSchema = new Schema({

    //Referencia id de otra tabla

    idCategoria:{
        type:Schema.Types.ObjectId,/// permite hacer relacion con otra collection
         ref:categoria, // indica el schema que hara relacion
         
         required: true},



    nombre:{type:String},
    
    codigo:{type:String,
        index: true,
        unique: true
    },
    precio:{type:Number},
    stock:{type:Number},
    foto:{type:String, default:null},

    // time_Start:{type:Date, required:true},
    // time_End:{type:Date, required:false, default:null},

    isDelete:{type:Boolean, default:false}/// para identificar si el usuario elimino el registro, sin ser eliminado. 


	},{
        timestamps: true
    }

)


//Export model
module.exports = mongoose.model('Producto', ProductoSchema);