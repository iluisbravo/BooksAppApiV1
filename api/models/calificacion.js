const mongoose = require('mongoose')
// mongoose.connect('mongodb://admin:myPass123@ds219641.mlab.com:19641/dbbooksapp')
// console.log(mongoose.connection.readyState);

const Schema = mongoose.Schema,
    objectId = Schema.objectId

    const calificacionSchema = new Schema({
        id: mongoose.Schema.Types.ObjectId,
        critico: { type: mongoose.Schema.Types.ObjectId, ref: 'Critico' },
        estrellas : Number,
        comentarios : String,
        fecha: { type: Date, default: Date.now }
    });

var Calificacion = mongoose.model('Calificacion',calificacionSchema);

module.exports = Calificacion;