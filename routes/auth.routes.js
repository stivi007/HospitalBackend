const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');


const router = Router();




router.post('/',[
    check('email','El e-mail es obligatorio').isEmail().not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login)










module.exports=router;