const mongoose = require('mongoose');
require('dotenv').config();


const dbConection = async()=>{
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Base de datos OK!');
    } catch (error) {
        throw new Error(`Ocurrio un error contacte con el administrador de la Base de datos: ${error}`);
    }
}



module.exports={
    dbConection
}