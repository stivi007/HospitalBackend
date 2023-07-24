const {request,response} = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async(req=request,res=response)=>{
    const {email,password} = req.body;

    try {

        const usuarioDb = await Usuario.findOne({email});
        //verifica email
        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:'El email no es valido'
            });
        }
        // verifica la contraseña
        const validPassword=bcrypt.compareSync(password,usuarioDb.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Contraseña no valida'
            });
        }
        //generar el token
        const token = await generarJWT(usuarioDb.id);

        res.json({
            ok:true,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:error
        })
    }
}


module.exports={
    login
}