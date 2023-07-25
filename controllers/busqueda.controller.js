const {request,response} = require('express');
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const buscador = async(req=request,res=response)=>{
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos,hospitales] = await Promise.all([
        await Usuario.find({nombre:regex}),
        await Medico.find({nombre:regex})
                        .populate('hospital','nombre')
                        .populate('usuario','nombre'),
        await Hospital.find({nombre:regex})
                        .populate('usuario','nombre')
    ]);
    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
    });
}

const buscadorEspesifico = async(req=request,res=response)=>{
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    let data=[]

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre:regex})
                        .populate('hospital','nombre')
                        .populate('usuario','nombre')
            
            break;

        case 'hospitales':
            data = await Hospital.find({nombre:regex})
                        .populate('usuario','nombre')
            break;
    
        case 'usuarios':
            data = await Usuario.find({nombre:regex})
        break;
    
        default:
            return res.status(400).json({
                ok:false,
                msg:'Las colecciones de busqueda son: medicos,hospitales y usuarios'
            });
    }

    res.json({
        ok:true,
        resultados:data
    });
}




module.exports={
    buscador,
    buscadorEspesifico
}