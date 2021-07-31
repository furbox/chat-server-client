const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
    de: { type: Schema.Types.ObjectId, ref: 'Usuario', require: true },
    para: { type: Schema.Types.ObjectId, ref: 'Usuario', require: true },
    mensaje: { type: String, require: true }
}, {
    versionKey: false,
    timestamps: true
});

MensajeSchema.method('toJSON', function () {
    const { _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Mensaje', MensajeSchema);