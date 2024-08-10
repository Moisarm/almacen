const mongoose = require('mongoose');


const Schema = mongoose.Schema;


let rolesValidos = {
    values: [
        'ADMIN', 
        'Almacenista',
        'Reader'
    ],
    message: '{VALUE}, is no a valid role'
};

const userSchema= new Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre is needed']
    },
    apellido: {
        type: String,
        required: [true, 'Apellido is needed']
    },
    userName: {
        type: String,
        required: [true, 'username is needed']
    },

    password: {
        type: String,
        required: [true, 'Password is needed']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },

    isDelete: {
        type: Boolean,
        default: false
    },
}

,{
    timestamps: true
}
)


module.exports = mongoose.model('User', userSchema);
