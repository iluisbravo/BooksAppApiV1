const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const peliculasRoutes = require('./api/routes/peliculas')
const criticosRoutes = require('./api/routes/criticos')
const calificacionesRoutes = require('./api/routes/calificaciones')

mongoose.connect('mongodb://admin:myPass123@ds219641.mlab.com:19641/dbbooksapp')
console.log(mongoose.connection.readyState);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors())

//routes 
app.use("/api/v1/peliculas",peliculasRoutes)
app.use("/api/v1/criticos",criticosRoutes)
app.use('/api/v1/calificaciones',calificacionesRoutes)

module.exports = app;