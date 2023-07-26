const {request,response} = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googleVerify');


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

const loginGoogle = async(req=request,res=response)=>{

    
    try {
        const {email,name,picture}= await googleVerify(req.body.token);
        const usuarioDb = await Usuario.findOne({email});
        let usuario;
        if(!usuarioDb){
            usuario= new Usuario({
                nombre:name,
                email,
                password:'@@@',
                img:picture,
                google:true
            })
        }else{
            usuario=usuarioDb;
            usuario.google=true;
        }
        await usuario.save();
        const token = await generarJWT(usuario.id);
        res.json({
            ok:true,
            email,
            name,
            picture,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:error
        });
    }  
}

const renewToken = async(req=request,res=response)=>{
    const uid = req.uid

    const token = await generarJWT(uid);
    res.json({
        ok:true,
        token
    });
}

module.exports={
    login,
    loginGoogle,
    renewToken
}