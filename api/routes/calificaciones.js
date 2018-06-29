const express = require('express');
const router = express.Router();
//const mongoose = require ('mongoose');
const moment = require('moment')
const Calificacion = require('../models/calificacion');
const Pelicula = require('../models/pelicula');

//GET ALL
router.get("/",(req,res)=>{
    Calificacion.find()
    .exec()
    .then(calificaciones => {
        res.status(200).send(calificaciones);
    })
    .catch(error => {
        res.status(404).send(error);
    })
});

//GET BY ID
router.get("/:uid",(req,res)=>{
    const {uid} = req.params;
    Calificacion.findById(uid)
    .exec()
    .then(calificacion => {
        calificacion = {
            id: calificacion._id,
            critico: calificacion.critico,
            estrellas : calificacion.estrellas,
            comentarios : calificacion.comentarios,
            fecha: moment(calificacion.fecha).format("DD/MM/YYYY")
        }
        res.status(200).send(calificacion);
    })
    .catch(error => {
        res.status(404).send(error);
    })
});

//CREATE 
router.post('/',(req,res) => {
    // {    "critico" :"5b3489907049df1cf1b197ff",
    // "estrellas":"5",
    // "comentarios":"Muy buena"}
    const {
    idPelicula,
    idCritico,
    estrellas,
    comentarios,
    } = req.body;

    let newCalificacion =  Calificacion({
        critico : idCritico,
        estrellas,
        comentarios
    })

    console.log(newCalificacion,"NUEVA CALIFICACION")
    newCalificacion.save((error,success) =>{
        if(error) throw error;
    
        Pelicula.findById(idPelicula).exec()
        .then(pelicula => {
           
           pelicula.calificaciones.push(success._id);
                     
           return Pelicula.findByIdAndUpdate(idPelicula,pelicula,{new:true}).exec()
           .then(peliculaUpdated => {
             res.status(201).send(peliculaUpdated);
           })
        })
        .catch(error => {
            res.status(404).send(error);
        })
    })
});

//UPDATE
router.put('/:uid',(req,res) => {
    // {
    //     "critico": "5b3489907049df1cf1b197ff",
    //     "estrellas": 5,
    //     "comentarios": "Muy buena",
    //     "fecha": "1992-06-23T14:00:00Z"
    // }

    const {uid} = req.params;
    const {
        critico,
        estrellas,
        comentarios} = req.body;
    
        let editCalificacion = {
            critico,
            estrellas,
            comentarios,
            fecha: new Date()
        };

    Calificacion.findByIdAndUpdate(uid,editCalificacion,{new:true}).exec()
    .then(calificacion => {
        res.status(200).send(calificacion);
    })
    .catch(error => {
        res.status(404).send(error);
    })
});

//DELETE
router.delete('/:uid',(req,res) => {
    const {uid} = req.params;
    Calificacion.findByIdAndRemove(uid).exec()
    .then(calificacion => {
        res.status(200).send(calificacion);
    })
    .catch(error => {
        res.status(404).send(error);
    })
});

module.exports = router;