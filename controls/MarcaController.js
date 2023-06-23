'use strict';
var models = require('../models/');
var marca = models.marca;


class MarcaController {
    async listar(req, res) {
        var listar = await marca.findAll({
                attributes: ['nombre'] 
        });
        res.json({ msg: 'OK!', code: 200, info: listar });
    }
}
module.exports = MarcaController;