const Router = require('express');
const { validarJWT } = require('../middlewares/validarJWT');
const { fileUpload, retornaImagen } = require('../controllers/upload.controller');
const expressFileUpload = require('express-fileupload');


const router = Router();
router.use(expressFileUpload());

router.put('/:tipo/:id',[
    validarJWT
],fileUpload);

router.get('/:tipo/:foto',retornaImagen);

module.exports=router;