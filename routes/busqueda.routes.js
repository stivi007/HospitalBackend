const Router = require('express');
const { validarJWT } = require('../middlewares/validarJWT');
const { buscador,buscadorEspesifico } = require('../controllers/busqueda.controller');

const router = Router();

router.get('/:busqueda',[
    validarJWT
],buscador);
router.get('/coleccion/:tabla/:busqueda',[
    validarJWT
],buscadorEspesifico);

module.exports=router;