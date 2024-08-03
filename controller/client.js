const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Client = require('../../models/client');
const app = express();

let obtenerOperacion = async (query, select={}, optionsPage)=>{
    const findOperaciones = await Auditoria.find(query).lean()
                    .select(select)
                    .sort({_id:-1})
                    .skip(optionsPage.page * optionsPage.limit)
                    .limit(optionsPage.limit)
                    .then(async (ob)=>{

                        console.log(`Find audit Operaciones:${JSON.stringify(ob)}`)


                        const count = await Auditoria.find(query).lean()
                        .countDocuments({})
                        .sort({_id:-1})

                        let response = {
                            objects: count,
                            pages: Math.round(count/this.optionsPage.limit),
                            current: this.optionsPage.page+1,
                            data:ob

                        }
            
                     return {
                         status: 200,
                         code: 2000,
                         date: new Date(),
                         info: "Homologacion encontrado",
                         response
                         }
             
                    })    
                    .catch((er)=>{
                        console.error(er);
                        
                         return { status: 400,
                             code: 4003,
                             date: new Date(),
                             info: "Error al buscar en BD Homologacion", 
                             response:er
                             }
                    })
                        
    return  findOperaciones
}

let getAllClients = (req,res) =>{

    Client.find({state:true})
        .exec((err, clientDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            Client.countDocuments({}, (err, conteo) => {

                res.json({
                    ok: true,
                    users: clientDB,
                    quantity: conteo
                });

            });

        });
}

let getAClient = (req, res) =>{

    let id = req.params.id;

    Client.findById(id)
        .exec((err, ClientDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            if (!ClientDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        mensaje: "There isn´t a client with this id"
                    }
                });
            };

            res.json({
                ok: true,
                ClientDB
            })


        });

}

let postClient = (req, res) =>{

    let body = req.body;
    // console.log(body);

    let client = new Client({
        enterprise: body.enterprise,
        business: body.business,
        location: body.location
    });

    client.save((err, clientCreado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            clientCreado
        });

    });


}

let putClient = (req, res) =>{
    console.log(req.body);
    let id = req.params.id;
    let body = _.pick(req.body, ['enterprise', 'business', 'location', 'img']);

    Client.findByIdAndUpdate(id, body, {new: true,runValidators: true,useFindAndModify: false}, (err, clientModificado) => {

        if (err) {
            // console.log(err);
            return res.status(501).json({
                ok: false,
                err
            })
        };
        if (!clientModificado) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: ' El id del cliente no existe '
                }
            });
        };

        res.json({
            ok: true,
            clientModificado
        });


    });


}

let deleteClient = (req, res) => {
    console.log('hola estoy en delete client');
    let id = req.params.id;
    let cambiaEstado = {
        state: false
    }

    Client.findByIdAndUpdate(id, cambiaEstado, {new: true,runValidators: true,useFindAndModify: false}, (err, clienteInhabilitado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            clienteBorrado: clienteInhabilitado
        });
    // 
    });

}


module.exports = {
    getAllClients,
    getAClient,
    postClient,
    putClient,
    deleteClient
}