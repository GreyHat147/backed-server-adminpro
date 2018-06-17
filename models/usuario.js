const moongose = require('mongoose');
const unitValidator = require('mongoose-unique-validator');
const Schema = moongose.Schema;

const rolesValid = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido',
};

const usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValid },
});

usuarioSchema.plugin(unitValidator, { message: 'El {PATH} debe ser unico' });
module.exports = moongose.model('Usuario', usuarioSchema);
