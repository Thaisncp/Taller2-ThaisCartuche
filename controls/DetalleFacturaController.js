'use strict';
const models = require('../models/');
const auto = models.auto;
const persona = models.persona;
const factura = models.factura;
const detalleFactura = models.detalleFactura;
const { validationResult } = require('express-validator');

let numeroDetalle = 1; let lastNumeroFactura = null;
let sumaTotales = 0; let totalGeneral = 0; let iva = 0.12;

class detalleFacturaController {
    async guardar(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    msg: 'FALTAN DATOS',
                    code: 400,
                    errors: errors.array()
                });
            }

            const id_persona = req.body.identificacion;
            const id_auto = req.body.external_Auto;

            if (id_persona === undefined && id_auto === undefined) {
                return res.status(400).json({
                    msg: 'FALTAN DATOS',
                    code: 400
                });
            }

            const autoAux = await auto.findOne({
                where: {
                    externalId: id_auto
                }
            });

            const personaAux = await persona.findOne({
                where: {
                    identificacion: id_persona
                }
            });

            if (!personaAux) {
                return res.status(400).json({
                    msg: 'LA PERSONA NO EXISTE O NO ESTA REGISTRADA',
                    code: 400
                });
            }

            if (!autoAux) {
                return res.status(400).json({
                    msg: 'NO EXISTE EL AUTO',
                    code: 400
                });
            }

            const numeroFactura = req.body.numeroFactura;
            const cantidadAutos = req.body.cantidad_Autos;
            const precioUnitario = autoAux.precio;
            const total = cantidadAutos * precioUnitario;

            if (numeroFactura !== lastNumeroFactura) {
                numeroDetalle = 1;
                await factura.update(
                    { total: totalGeneral },
                    {
                        where: {
                            numeroFactura: lastNumeroFactura
                        }
                    }
                );
                sumaTotales = 0;
            }

            lastNumeroFactura = numeroFactura;

            const data = {
                numeroDetalle: numeroDetalle,
                cantidad: cantidadAutos,
                precioUnitario: precioUnitario,
                total: total,
                id_auto: autoAux.id,
                factura: {
                    numeroFactura: numeroFactura,
                    id_persona: personaAux.id
                }
            };

            if (data.cantidad === 0) {
                return res.status(200).json({
                    msg: 'CANTIDAD INCORRECTA',
                    code: 200
                });
            } else if (cantidadAutos > autoAux.stock) {
                return res.status(200).json({
                    msg: 'NUMERO DE AUTOS DISPONIBLES' + autoAux.stock,
                    code: 200
                });
            }

            numeroDetalle++;
            sumaTotales += total;
            totalGeneral = iva * sumaTotales;

            const uuid = require('uuid');
            data.externalId = uuid.v4();

            const transaction = await models.sequelize.transaction();

            const [crearFactura, estaCreada] = await factura.findOrCreate({where: {numeroFactura: data.factura.numeroFactura},
                defaults: {
                    id_persona: data.factura.id_persona,
                    total: totalGeneral
                },
                transaction
            });

            if (!estaCreada) {
                await factura.update({ total: totalGeneral },{where: {id: crearFactura.id},transaction});
            }

            console.log(sumaTotales)
            data.id_factura = crearFactura.id;

            await detalleFactura.create(data, { transaction });
            await transaction.commit();

            autoAux.stock = autoAux.stock - cantidadAutos;
            var result = await autoAux.save();
            return res.status(200).json({
                msg: 'DETALLE CREADO CORRECTAMENTE',
                code: 200
            });


        } catch (error) {
            console.log(error);
            if (error.errors && error.errors[0].message) {
                return res.status(200).json({
                    msg: error.errors[0].message,
                    code: 200
                });
            } else {
                return res.status(400).json({
                    msg: 'Ha ocurrido un error en el servidor',
                    code: 400
                });
            }
        }
    }

}

module.exports = detalleFacturaController;
