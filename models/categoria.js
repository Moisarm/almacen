const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({

    //campos:
    categoria_nombre:{type:String},
    isDelete:{type:Boolean, default:false}
	},{
        timestamps: true
    }

)


//Export model
module.exports = mongoose.model('Categoria', CategoriaSchema);