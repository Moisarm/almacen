const mongoose = require('mongoose');
const categoria = require('./categoria');

const Schema = mongoose.Schema;

const ProductoSchema = new Schema({

    idCategoria:{
        type:Schema.Types.ObjectId,/// permite hacer relacion con otra collection
         ref:categoria, // indica el schema que hara relacion
         
         required: true},
    
    campaig_Name:{type:String},
    time_Start:{type:Date, required:true},
    time_End:{type:Date, required:false, default:null},

    requestors:{type:String},
    description:{type:String},

    status: {type:Number}  //[Activo = 1, Suspendido = 2, Terminado = 3, Cancelado=4, En Espera=5]


	},{
        timestamps: true
    }

)


//Export model
module.exports = mongoose.model('Producto', ProductoSchema);