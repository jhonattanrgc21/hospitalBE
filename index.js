require('dotenv').config();
const express = require("express");
const { dbConecction } = require('./database/config')
const cors = require('cors');

const PORT = process.env.PORT;
const app = express();
app.use(cors());

// Lectura y parseo el body
app.use(express.json())

// Base de datos
dbConecction();


// Rutas
app.use('/api/users', require('./routes/users.route'));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/hospital', require('./routes/hospital.route'));

app.listen(PORT, () => console.log('Server on porth: ', PORT));