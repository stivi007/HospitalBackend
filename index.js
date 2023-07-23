const express = require('express');
const {dbConection} = require('./database/config')
require('dotenv').config();
const cors = require('cors');




const port=process.env.PORT;


const app = express();

app.use(cors());

dbConection();

app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg:'todo ok'
    })
})

app.listen(port,()=>{
    console.log(`servidor corriendo en puerto: ${port}`)
})






