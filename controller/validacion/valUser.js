const Joi = require('joi');

const  valUserSchema = Joi.object({
    
    nombre: 
    Joi.string()
    .required(),

    apellido:
    Joi.string()
    .required(),

    userName:
    Joi.string()
    .required(),

    password:
    Joi.string()
    .required()
    .min(5)
    .max(25),

    role:
    Joi.string()
    .required()

})

module.exports = {
    valUserSchema
}