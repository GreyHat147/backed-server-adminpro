const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.post('/', (req, res) => {
    const body = req.body;

    Usuario.findOne({email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err,
            });
        }
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: err,
            });
        }
        if (!bcryptjs.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err,
            });
        }

        userDB.password = ':(';
        const token = jwt.sign({ usuario: userDB }, 'KHAL', { expiresIn: 14400 });
        return res.status(200).json({
            ok: true,
            userDB,
            errors: err,
            token,
        });
    });
});

module.exports = app;