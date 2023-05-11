require('dotenv').config();
const express = require("express");
const { dbConecction } = require('./database/config')
const cors = require('cors');

const PORT = process.env.PORT;
const app = express();
app.use(cors());

// Base de datos
dbConecction();


// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
})

app.listen(PORT, () => console.log('Server on porth: ', PORT));