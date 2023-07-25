const express = require('express');
const {dbConection} = require('./database/config')
require('dotenv').config();
const cors = require('cors');


const port=process.env.PORT;

//creal el servidor de express
const app = express();

//configuracion del CORS
app.use(cors());

//lectura y parceo del body
app.use(express.json());

//Funcion que hace la coneccion con la base de datos
dbConection();

//rutas
app.use('/api/usuarios',require('./routes/usuario.routes'));
app.use('/api/login',require('./routes/auth.routes'));
app.use('/api/hospitales',require('./routes/hospital.routes'));
app.use('/api/medicos',require('./routes/medico.routes'));
app.use('/api/todo',require('./routes/busqueda.routes'));
app.use('/api/uploads',require('./routes/upload.routes'));

app.listen(port,()=>{
    console.log(`servidor corriendo en puerto: ${port}`)
})






