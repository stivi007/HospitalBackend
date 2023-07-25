const Usuario = require('../models/usuario.model');
const {request,response} = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req,res)=>{
    const desde = Number(req.query.desde) || 0;
    console.log(desde)
    // const usuarios= await Usuario.find({},'_id nombre email role google')
    //                     .skip(desde)
    //                     .limit(5)
    
    // const total = await Usuario.count();
    const [usuarios,total]=await Promise.all([
        Usuario
            .find({},'_id nombre email role google img')
            .skip(desde)
            .limit(5),
            Usuario.countDocuments()
    ]);

    res.json({
        ok:true,
        total,
        usuarios
    })
}

const postUsuario = async(req=request,res=response)=>{
    const {password,email}= req.body;

    try {
        const emailValid = await Usuario.findOne({email});
        if(emailValid){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya fue registrado'
            });
        }

        const usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
         

        await usuario.save();
        //generar el token
        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:error
        });
    }

    
}

const putUsuario = async(req=request,res=response)=>{
    const uid = req.params.id;
    try {
        const usuarioDb = await Usuario.findById(uid)
        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:`No se encontro un usuario con el id: ${uid}`
            })
        }

        const {google,email,password,...campos} = req.body;
        if(usuarioDb.email !== email){ 
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese e-mail'
                });
            }
        }
        campos.email=email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});

        res.status(200).json({
            ok:true,
            usuario:usuarioActualizado
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:error
        });
    }
}

const deleteUsuario = async(req=request,res=response)=>{
    const uid = req.params.id;
    try {
        const usuarioDb = await Usuario.findById(uid)
        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:`No se encontro un usuario con el id: ${uid}`
            })
        }
        await Usuario.findByIdAndDelete(uid);
        res.status(200).json({
            ok:true,
            msg:`Usuario eliminado correctamente`
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:error
        })
    }
}


module.exports={
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}