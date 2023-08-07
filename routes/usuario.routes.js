const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario.controller');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');






    const router = Router();
    router.get('/',validarJWT,getUsuarios);

    router.post('/', [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','El e-mail es obligatorio').not().isEmpty().isEmail(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],postUsuario);

    router.put('/:id',[
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','El e-mail es obligatorio').not().isEmpty().isEmail(),
        // check('role','El role es obligatorio').not().isEmpty(),
        validarCampos
    ],putUsuario);

    router.delete('/:id',[
        validarJWT
    ],deleteUsuario)


module.exports= router;