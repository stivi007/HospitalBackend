const fs = require('fs');
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const borrarImagen = (path)=>{
    
    if(fs.existsSync(path)){
        //borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(tipo,id,nombreAarchivo)=>{
    let pathViejo='';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico) return false;
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);
            medico.img = nombreAarchivo;
            await medico.save();
            return true

            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital) return false;
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);
            hospital.img = nombreAarchivo;
            await hospital.save();
            return true
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario) return false;
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            usuario.img = nombreAarchivo;
            await usuario.save();
            return true
            break;

        default:
            break;
    }
}


module.exports={
    actualizarImagen
}