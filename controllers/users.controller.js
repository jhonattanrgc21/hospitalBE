const { response } = require('express');
const bcrypt = require('bcryptjs')

const User = require('../models/users')

const getUsers = async (req, res) => {

    const users = await User.find({}, 'name email role google');
    res.json({
        ok: true,
        users
    })
}

const createUser = async (req, res = response) => {

    try {
        const { email, password } = req.body;
        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta en uso'
            })
        }

        const user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateToken(user.id);

        res.json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        })
    }
}

const updateUser = async (req, res = response) => {
    const uid = req.params.id
    try {
        let user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese ID'
            })
        }

        const {email, password, google, ...inputs}  = req.body;

        if(user.email !== email){
            const existUser = await User.findOne({ email });
            if (existUser) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya esta en uso'
                })
            }
        }

        inputs,email = email;
        const updatedUser = await User.findByIdAndUpdate(uid, inputs, { new: true});

        res.json({
            ok: true,
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        })
    }
}

const deleteUser = async (req, res = response) => {
    try {
        const uid = req.params.id
        const user = await User.findById(uid)

        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'Error, no existe un usuario con ese ID'
            })
        }

        user.isActive = false
        await User.findByIdAndUpdate(uid, user, { new: true});
        res.json({
            ok: true,
            uid
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
    getUsers,
    createUser,
    updateUser,
    deleteUser
}