'use strict';
const { authPlugins } = require('mysql2');
var models = require('../models/');
var auto = models.auto;
var marca = models.marca;

const { validationResult } = require('express-validator');
class AutoController {
    async listar(req, res) {
        var listar = await auto.findAll({
            attributes: ['modelo', 'precio','color','placa', 'anio', 'stock', 'externalId'],
            include: {
                model: marca,
                as: 'marca',
                attributes: ['nombre', 'pais']
            }
        });
        res.json({ msg: 'OK!', code: 200, info: listar });
    }
    async obtener(req, res) {
        const external = req.params.external;
        var listar = await auto.findOne({
            where: { externalId: external }, include: { model: marca, as: 'marca', attributes: ['nombre', 'pais']},
            attributes: ['modelo', 'precio', 'anio', 'stock', 'externalId', 'color', 'placa'],
        });
        if (listar == null) {
            listar = {}
        }
        res.status(200);
        res.json({ msg: 'OK!', code: 200, info: listar });
    }
    
    async guardar(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    msg: "DATOS INCOMPLETOS",
                    code: 400,
                    errors: errors.array()
                });
            }
            
            const data = {
                modelo: req.body.modelo,
                precio: req.body.precio,
                anio: req.body.anio,
                color: req.body.color,
                placa: req.body.placa,
                stock: req.body.stock,
                marca: {
                    nombre: req.body.nombre,
                },
            };
    
            const uuid = require('uuid');
            data.externalId = uuid.v4();
    
            const transaction = await models.sequelize.transaction();
    
            // Buscar la marca por el nombre
            const [marca] = await models.marca.findOrCreate({
                where: { 
                    nombre: data.marca.nombre
                },
                defaults: { 
                    pais: data.marca.pais 
                },
                transaction
            });
            
            // Asignar el ID de la marca al objeto de auto
            data.id_marca = marca.id; 
    
            await auto.create(data, { 
                transaction 
            });

            await transaction.commit();
    
            return res.status(200).json({
                msg: "AUTO REGISTRADO CON EXITO",
                code: 200
            });
        } catch (error) {
            if (error.errors && error.errors[0].message) {
                return res.status(200).json({
                    msg: error.errors[0].message,
                    code: 200
                });
            } else {
                return res.status(400).json({
                    msg: "error en el servidor",
                    code: 400
                });
            }
        }
    }

    async modificar(req, res) {
        console.log("-----",req);
        var auth = await auto.findOne({ where: { externalId: req.body.externalId } }); 
        console.log(auth);
        if (auth === null) {
            res.status(400);
            res.json({
                msg: "NO EXISTEN REGISTROS",
                code: 400
            });
        } else {
            var uuid = require('uuid');
            auth.modelo = req.body.modelo;
            auth.precio = req.body.precio;
            auth.anio = req.body.anio;
            auth.color = req.body.color;
            auth.placa = req.body.placa;
            auth.stock = req.body.stock;
            auth.externalId = uuid.v4();
            var result = await auth.save();
            if (result === null) {
                res.status(400);
                res.json({
                    msg: "NO SE HAN MODIFICADO LOS DATOS DEL AUTO",
                    code: 400
                });
            } else {
                res.status(200);
                res.json({
                    msg: "SE HAN MODIFICADO LOS DATOS DEL AUTO CORRECTAMENTE",
                    code: 200
                });
            }
        }
    }
    

}
module.exports = AutoController;