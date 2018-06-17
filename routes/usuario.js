const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

app.get('/', (req, res, next) => {
    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios',
                        errros: err,
                    });
                }
                res.status(200).json({
                    ok: true,
                    usuarios,
                });
            });
});

app.post('/', (req, res) => {
    const body = req.body;
    const usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcryptjs.hashSync(body.password, 10),
        img: body.img,
        role: body.role,
    });

    usuario.save((err, userCreated) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error creado usuario',
                errros: err,
            });
        }
        res.status(201).json({
            ok: true,
            usuario: userCreated,
        });
    });
});

app.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Usuario.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errros: err,
            });
        }
        if (!user) {
            return res.status(400).json({
                ok: false,
                mensaje: `El usuario con el id ${id} no existe`,
                errros: err,
            });
        }

        user.nombre = body.nombre;
        user.email = body.email;
        user.role = body.role;

        user.save((errUpdating, userSaved) => {
            if (errUpdating) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errros: errUpdating,
                });
            }
            return res.status(201).json({
                ok: true,
                usuario: userSaved,
            });
        });
    });
});

app.delete('/:id', (req, res) => {
    const id = req.params.id;
    Usuario.findOneAndRemove(id, (err, userRemoved) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrando usuario',
                errros: err,
            });
        }
        return res.status(200).json({
            ok: true,
            usuario: userRemoved,
        });
    });
});

module.exports = app;