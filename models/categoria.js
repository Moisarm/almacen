const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({


	},{
        timestamps: true
    }

)


//Export model
module.exports = mongoose.model('Categoria', CategoriaSchema);