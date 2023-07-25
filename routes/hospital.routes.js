const Router = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { getHospitales, postHospital, putHospital, deletetHospital } = require('../controllers/hospital.controller');


const router = Router();

router.get('/',getHospitales);
router.post('/',[
    validarJWT,
    check('nombre','El nombre del hospital es nesesario').not().isEmpty(),
    validarCampos
],postHospital);
router.put('/:id',putHospital);
router.delete('/:id',deletetHospital);




module.exports=router;