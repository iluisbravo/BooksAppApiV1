const mongoose = require('mongoose')
// mongoose.connect('mongodb://admin:myPass123@ds219641.mlab.com:19641/dbbooksapp')
// console.log(mongoose.connection.readyState);

const Schema = mongoose.Schema,
    objectId = Schema.objectId

const peliculaSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    nombre: String,
    duracion: Number,
    clasificacion: String,
    genero: String,
    director: String,
    sinopsis: String,
    premios: [],
    anio: Number,
    portada: String,
    actores: [],
    video: String,
    calificaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calificacion' }]
});

var Pelicula = mongoose.model('Pelicula',peliculaSchema);

module.exports = Pelicula;