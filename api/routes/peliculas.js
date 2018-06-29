const express = require('express');
const router = express.Router();
const moment = require('moment');
const Pelicula = require('../models/pelicula');
const Criticos = require('../models/critico')

//GET ALL
router.get("/",(req,res)=>{
    Pelicula.find()
    .populate('calificaciones')
    .exec()
    .then(peliculas => {
        res.status(200).send(peliculas);
    })
    .catch(error => {
        res.status(404).send(error);
    })
})

//GET BY ID
router.get("/:uid",(req,res)=>{
    const {uid} = req.params;
    Pelicula.findById(uid)
    .populate('calificaciones')
    .exec()
    .then(pelicula => {
        res.status(200).send(pelicula);
    })
    .catch(error => {
        res.status(404).send(error);
    })
});

//CREATE
router.post('/',(req,res) => {
    //{"nombre": "Luis", "apellidos":"Bravo Castro", "email":"luis@gmail.com", "fecha_nacimiento":"1992-06-23T14:00:00Z"}
    const {
        nombre,
        duracion,
        clasificacion,
        genero,
        director,
        sinopsis,
        premios,
        anio,
        portada,
        actores,
        video,
        calificaciones
    } = req.body;

    let newPelicula = Pelicula({
        nombre,
        duracion,
        clasificacion,
        genero,
        director,
        sinopsis,
        premios,
        anio,
        portada,
        actores,
        video,
        calificaciones
    })
    newPelicula.save((error,success) =>{
        if(error) throw error;
        res.status(201).send(success);
    })
});

//UPDATE
router.put('/:uid',(req,res) => {
    const {uid} = req.params;
    const {
        nombre,
        duracion,
        clasificacion,
        genero,
        director,
        sinopsis,
        premios,
        anio,
        portada,
        actores,
        video,
        calificaciones
    } = req.body;

    let editPelicula = {
        nombre,
        duracion,
        clasificacion,
        genero,
        director,
        sinopsis,
        premios,
        anio,
        portada,
        actores,
        video,
        calificaciones
    };

    Pelicula.findByIdAndUpdate(uid,editPelicula,{new:true}).exec()
    .then(pelicula => {
        res.status(200).send(pelicula);
    })
    .catch(error => {
        res.status(404).send(error);
    })
});

//DELETE
router.delete('/:uid',(req,res) => {
    const {uid} = req.params;
    Pelicula.findByIdAndRemove(uid).exec()
    .then(pelicula => {
        res.status(200).send(pelicula);
    })
    .catch(error => {
        res.status(404).send(error);
    })
});

module.exports = router;