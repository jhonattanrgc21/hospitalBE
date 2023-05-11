const mongoose = require('mongoose');

const dbConecction = async () => {
    const CDN = process.env.DB_CDN
    mongoose.connect(CDN)
    .then(() => console.log('BD iniciada correctamente'))
    .catch((error) => console.log('Error, no se pudo iniciar la BD: ', error));
}

module.exports = {
    dbConecction
};