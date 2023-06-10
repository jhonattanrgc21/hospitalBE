const { response } = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/users');
const { generateToken } = require('../helpers/jwt');

const login = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if(!user){
            res.status(404).json({
                ok: false,
                msg: 'Error, email no valido'
            })
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            res.status(400).json({
                ok: false,
                msg: 'Error, contraseña no valida'
            })
        }

        const token = await generateToken(user.id);
        
        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hable ocn el administrador'
        })
    }
}

module.exports = {
    login
}