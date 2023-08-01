const {response,request} = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizarImagen');


const fileUpload = (req=request,res=response)=>{
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['usuarios','medicos','hospitales'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'No es un tipo valido'
        });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No se mando ningun archivo'
        });
    }

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[nombreCortado.length-1];

    const extencionsValidas = ['png','jpg','gif','jpeg'];
    if(!extencionsValidas.includes(extencionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'No es una extencion permitida'
        })
    }
    //generar el nombre del archivo
    const nombreAarchivo = `${uuidv4()}.${extencionArchivo}`;

    //path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreAarchivo}`;
     // mover la imagen
    file.mv(path, (err)=> {
        if (err){
            return res.status(500).json({
                ok:false,
                msg:err
            });
        }

        //actualizar la base de datos
        actualizarImagen(tipo,id,nombreAarchivo);

        res.json({
            ok:true,
            msg:'Archivo upload',
            nombreAarchivo
        });
    });
}

const retornaImagen = (req=request,res=response)=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);
    
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}



module.exports={
    fileUpload,
    retornaImagen
}