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

const putHospital = (req=request,res=response)=>{
    res.json({
        ok:true,
        msg:'hola hospital put'
    });
}

const deletetHospital = (req=request,res=response)=>{
    res.json({
        ok:true,
        msg:'hola hospital delete'
    });
}

module.exports={
    getHospitales,
    postHospital,
    putHospital,
    deletetHospital
}