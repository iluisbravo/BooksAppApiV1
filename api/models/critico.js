const mongoose = require('mongoose')
// mongoose.connect('mongodb://admin:myPass123@ds219641.mlab.com:19641/dbbooksapp')
// console.log(mongoose.connection.readyState);

const Schema = mongoose.Schema,
    objectId = Schema.ObjectId

const criticoSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    nombre: String,
    apellidos: String,
    email: String,
    fecha_nacimiento: Date
})

var Critico = mongoose.model('Critico',criticoSchema);

module.exports = Critico;