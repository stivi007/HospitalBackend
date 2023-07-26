const {response,request} = require('express');
const Hospital = require('../models/hospital.model');




const getHospitales = async(req=request,res=response)=>{

    const hospitales = await Hospital.find()
                        .populate('usuario','nombre img')

    res.json({
        ok:true,
        hospitales
    });
}

const postHospital = async(req=request,res=response)=>{
    const uid = req.uid;

    const hospital = new Hospital({usuario:uid,...req.body});
    
    try {
        const hospitalBd=await hospital.save();
        res.json({
            ok:true,
            hospital:hospitalBd
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:error
        });
    }
}

const putHospital = async(req=request,res=response)=>{
    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospitalDb = await Hospital.findById(id);
        if(!hospitalDb){
            return res.status(404).json({
                ok:false,
                msg:'Hospital no encontrado'
            });
        }
        const cambiosHospital ={
            ...req.body,
            usuario:uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true}).populate('usuario','nombre img')


        res.json({
            ok:true,
            hospital:hospitalActualizado
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:error
        })
    }
}

const deletetHospital = async(req=request,res=response)=>{
    const id = req.params.id;

    try {
        const hospitalDb = await Hospital.findById(id);
        if(!hospitalDb){
            return res.status(404).json({
                ok:false,
                msg:'Hospital no encontrado'
            });
        }
        await Hospital.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:'Hospital eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:error
        })
    }
}

module.exports={
    getHospitales,
    postHospital,
    putHospital,
    deletetHospital
}