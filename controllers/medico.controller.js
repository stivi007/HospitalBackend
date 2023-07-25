const {response,request} = require('express');
const Medico = require('../models/medico.model');




const getMedicos = async(req=request,res=response)=>{

    const medicos = await Medico.find()
                        .populate('hospital','nombre img')
                        .populate('usuario','nombre img')

    res.json({
        ok:true,
        medicos
    });
}

const postMedico = async(req=request,res=response)=>{
    const uid = req.uid;
    const medico = new Medico({
        usuario:uid,
        ...req.body
    });

    try {
        const medicoDb = await medico.save();

        res.json({
            ok:true,
            medico:medicoDb
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:error
        });
    }
}

const putMedico = (req=request,res=response)=>{
    res.json({
        ok:true,
        msg:'hola medico put'
    });
}

const deletetMedico = (req=request,res=response)=>{
    res.json({
        ok:true,
        msg:'hola medico delete'
    });
}

module.exports={
    getMedicos,
    postMedico,
    putMedico,
    deletetMedico
}