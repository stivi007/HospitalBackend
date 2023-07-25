const Router = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { getMedicos, postMedico, putMedico, deletetMedico } = require('../controllers/medico.controller');


const router = Router();

router.get('/',getMedicos);
router.post('/',[
    validarJWT,
    check('nombre','El nombre del medico es requerido').not().isEmpty(),
    check('hospital','No es in id valido').isMongoId(),
    validarCampos
],postMedico);
router.put('/:id',putMedico);
router.delete('/:id',deletetMedico);




module.exports=router;