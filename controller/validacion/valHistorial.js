const Joi = require('joi')

const valHistorialSchema = Joi.object({
    idProducto:
    Joi.String()
    .required(),

    idUser:
    Joi.string()
    .required(),

    cantidad:
    Joi.number()
    .min(0)
    .required(),

    estado:
    Joi.string()
    .required(),

    fecha:
    Joi.date()
    .required(),


    foto:
    Joi.string()
    .required(),

})

module.exports = {valHistorialSchema}