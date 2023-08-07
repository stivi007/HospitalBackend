const Router = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { getMedicos, postMedico, putMedico, deletetMedico, getMedicoById } = require('../controllers/medico.controller');


const router = Router();

router.get('/',validarJWT,getMedicos);
router.get('/:id',validarJWT,getMedicoById);
router.post('/',[
    validarJWT,
    check('nombre','El nombre del medico es requerido').not().isEmpty(),
    check('hospital','No es un id valido').isMongoId(),
    validarCampos
],postMedico);
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital','No es un id valido').isMongoId(),
    validarCampos
],putMedico);
router.delete('/:id',validarJWT,deletetMedico);




module.exports=router;