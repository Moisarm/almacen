const mongoose = require('mongoose');
const producto = require('./producto');
const user = require('./users');

const Schema = mongoose.Schema;

const HistorialSchema = new Schema({


    //Referencia id de otra tabla
    idProducto:{
        type:Schema.Types.ObjectId,/// permite hacer relacion con otra collection
         ref:producto,// indica el schema que hara relacion
         required: true},

    idUser:{
        type:Schema.Types.ObjectId,
        ref:user,
        // required:true
    },

    cantidad:{type:Number},
    estado:{type:String},
    fecha:{type:Date},
    // foto:{type:String, default:null},


    isDelete:{type:Boolean, default:false}/// para identificar si el usuario elimino el registro, sin ser eliminado. 


	},{
        timestamps: true}
    )

    //Exporta el modelo
    module.exports = mongoose.model('Historial',HistorialSchema)