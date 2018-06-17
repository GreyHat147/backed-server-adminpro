const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

exports.verifyToken = (req, res, next) => {
    const token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errros: err,
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};