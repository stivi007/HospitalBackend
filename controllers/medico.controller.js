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

const putMedico = async(req=request,res=response)=>{
    const id = req.params.id;
    const uid = req.uid;
    try {
        const medicoDb = await Medico.findById(id);
        if (!medicoDb) {
            return res.status(404).json({
                ok:false,
                msg:'Medico no encontrado'
            });
        }
        const cambiosMedico ={
            ...req.body,
            usuario:uid
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico,{new:true})
                                                            .populate('usuario','nombre img')
                                                            .populate('hospital','nombre img')

        res.json({
            ok:true,
            medico:medicoActualizado
        });
    } catch (error) {
        res.json({
            ok:false,
            msg:error
        });
    }
}

const deletetMedico = async(req=request,res=response)=>{
    const id = req.params.id;

    try {
        const medicoDb = await Medico.findById(id);
        if(!medicoDb){
            return res.status(404).json({
                ok:false,
                msg:'Medico no encontrado'
            });
        }
        await Medico.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:'Medico eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:error
        })
    }
}

module.exports={
    getMedicos,
    postMedico,
    putMedico,
    deletetMedico
}