const { Router } = require('express');
const { login, loginGoogle } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');


const router = Router();




router.post('/',[
    check('email','El e-mail es obligatorio').isEmail().not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('token','El Token de google es obligatorio').not().isEmpty(),
    validarCampos
],loginGoogle)










module.exports=router;