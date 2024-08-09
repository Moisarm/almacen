const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs');
const jsonwebtoken = require('jsonwebtoken');


// let Client = mongoose.model('Client');

let rolesValidos = {
    values: [
        'ADMIN', 
        'Almacenista',
        'Reader'
    ],
    message: '{VALUE}, is no a valid role'
};

/*let validDepartments = {
    values: ['sales', 'tech', 'maintaing', 'service'],
    message: '{VALUE}, is not a valid deparment'
};*/

const Schema = mongoose.Schema;


let userSchema = new Schema({
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
       /* email: {
            type: String,
            required: [true, 'email is needed'],
            unique: true,
            lowercase: true
        },*/
        password: {
            type: String,
            required: [true, 'Password is needed']
        },
        role: {
            type: String,
            default: 'USER_ROLE',
            enum: rolesValidos
        },
        /*img: {
            type: String,
            required: false
        },*/
        isDelete: {
            type: Boolean,
            default: true
        },

}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    const usuario = this;
    if (!usuario.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            next(err);
        }
        bcrypt.hash(usuario.password, salt, null, (err, hash) => {
            if (err) {
                next(err);
            }
            usuario.password = hash;
            next();
        });
    });
});

userSchema.methods.compararPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, sonIguales) => {
        if (err) {
            return callback(err);
        };
        callback(null, sonIguales);
    })
    //const token =  JWT.sign({})
};

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
})

module.exports = mongoose.model('User', userSchema);