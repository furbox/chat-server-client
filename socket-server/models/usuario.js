const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    online: { type: Boolean, default: false }
}, {
    versionKey: false,
    timestamps: true
});

UsuarioSchema.method('toJSON', function () {
    const { password, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);