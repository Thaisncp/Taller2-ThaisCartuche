var express = require('express');
var router = express.Router();
const {body, validationResult} = require('express-validator');
const RolController = require('../controls/RolController');
var rolController = new RolController();
const PersonaController = require('../controls/PersonaController');
const AutoController = require('../controls/AutoController');
var personaController = new PersonaController();
var autoController = new AutoController();
const CuentaController = require('../controls/CuentaController');
var cuentaController = new CuentaController();
const MarcaController = require('../controls/MarcaController');
var marcaController = new MarcaController();
let jwt = require('jsonwebtoken');

//middleware
var auth=function middleware(req,res,next){
  const token=req.headers['x-api-token'];
  if (token) {
    require('dotenv').config();
    const llave = process.env.KEY;
    jwt.verify(token,llave,async (err,decoded)=>{
      if (err) {
        res.status(401);
        res.json({ msg: "Token no valido o expirado!", code: 401 });
      }else{
        var models=require('../models');
        var cuenta=models.cuenta;
        req.decoded=decoded; 
        let aux= await cuenta.findOne({where:{external_id:req.decoded.external}});
        if (aux===null) {
          res.status(401);
          res.json({ msg: "Token no valido!", code: 401 });
        } else {
          next();
        }
      }
    })
  } else {
    res.status(401);
    res.json({ msg: "No existe token", code: 401 });
  }
}
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({ "version": "1.0", "name": "auto" });
});

router.get('/roles', rolController.listar);
//CUENTA
router.post('/sesion', [
  body('usuario', 'Ingrese algun dato').trim().exists().not().isEmpty().isEmail(),
  body('clave', 'Ingrese algun dato').trim().exists().not().isEmpty(),
],cuentaController.sesion);
//persona
router.post('/personas/guardar',[
  body('apellidos', 'Ingrese algun dato').trim().exists().not().isEmpty().isLength({min: 3, max: 50}).withMessage("Ingrese un valor mayor a 3 y menor a 50"),
  body('nombres', 'Ingrese algun dato').trim().exists().not().isEmpty().isLength({min: 3, max: 50}).withMessage("Ingrese un valor mayor a 3 y menor a 50"),
  body('identificacion', 'Ingrese algun dato').trim().exists().not().isEmpty().isLength({min: 10, max: 15}).withMessage("Ingrese un valor mayor a 10 y menor a 15"),
], personaController.guardar);
router.get('/personas', auth, personaController.listar);
router.get('/personas/obtener/:external',auth,  personaController.obtener);
router.post('/personas/modificar', auth, personaController.modificar);

//AUTOOO
router.post('/auto/guardar',[
  body('modelo', 'Ingrese algun dato').trim().exists().not().isEmpty(),
  body('precio', 'Ingrese algun dato').trim().exists().not().isEmpty(),
  body('anio', 'Ingrese algun dato').trim().exists().not().isEmpty(),
  body('color', 'Ingrese algun dato').trim().exists().not().isEmpty(),
  body('placa', 'Ingrese algun dato').trim().exists().not().isEmpty(),
], auth, autoController.guardar);
router.get('/autos/listar', auth, autoController.listar);
router.get('/autos/obtener/:external', auth, autoController.obtener);
router.post('/autos/modificar', auth,autoController.modificar);

//MARCA
router.get('/autos/marca', marcaController.listar);

/*router.get('/sumar/:a/:b', function (req, res, next) {
  var a = Number(req.params.a);
  var b = Number(req.params.b);
  var c = a + b;
  res.status(200);
  res.json({ "msg": "OK", "resp": c });
});

router.post('/sumar', function (req, res, next) {
  var a = Number(req.body.a);
  var b = Number(req.body.b);
  if (isNaN(a) || isNaN(b)) {
    res.status(400);
    res.json({ "msg": "FALTAN DATOS"});
  }
  var c = a + b;
  res.status(200);
  res.json({ "msg": "OK", "resp": c });

});*/

module.exports = router;