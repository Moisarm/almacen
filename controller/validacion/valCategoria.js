const Joi = require('joi');

const valCategoriaSchema = Joi.object({
    categoria_nombre: Joi.string().required()
})

module.exports = {
    valCategoriaSchema
}