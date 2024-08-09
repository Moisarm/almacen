const Joi = require('joi');

const  valProductoSchema = Joi.object({
    
    idCategoria: Joi.string()
    .required(),
    
    nombre: Joi.string()
    .required(),


    precio: Joi.number()
    .min(0.50)
    .required(),
    
    codigo: Joi.number()
    .min(0.50)
    .required(),

    stock: Joi.number()
    .integer()
    .min(0)
    .required(),

    foto: Joi.string(),

})

module.exports = {
    valProductoSchema
}