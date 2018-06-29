const express = require('express');
const router = express.Router();
//const mongoose = require ('mongoose');
const moment = require('moment')
const Critico = require('../models/critico');

//GET ALL
router.get("/",(req,res)=>{
    Critico.find()
    .exec()
    .then(criticos => {
        res.status(200).send(criticos);
    })
    .catch(error => {
        res.status(404).send(error);
    })
});

//GET BY ID
router.get("/:uid",(req,res)=>{
    const {uid} = req.params;
    Critico.findById(uid)
    .exec()
    .then(critico => {
        critico = {
            id : critico._id,
            nombre: critico.nombre,
            apellidos :critico.apellidos,
            email : critico.email,
            fecha_nacimiento: moment(critico.fecha_nacimiento).format("DD/MM/YYYY")

        }
        res.status(200).send(critico);
    })
    .catch(error => {
        res.status(404).send(error);
    })
});

//CREATE
router.post('/',(req,res) => {
    //{"nombre": "Luis", "apellidos":"Bravo Castro", "email":"luis@gmail.com", "fecha_nacimiento":"1992-06-23T14:00:00Z"}
    const {nombre, apellidos, email, fecha_nacimiento} = req.body;

    let newCritico = Critico({
        nombre,
        apellidos,
        email,
        fecha_nacimiento
    })
    newCritico.save((error,success) =>{
        if(error) throw error;
        res.status(201).send(success);
    })
});

//UPDATE
router.put('/:uid',(req,res) => {
    const {uid} = req.params;
    const {nombre,apellidos,email,fecha_nacimiento} = req.body;

    let editCritico = {
        nombre,
        apellidos,
        email,
        fecha_nacimiento
    };

    Critico.findByIdAndUpdate(uid,editCritico,{new:true}).exec()
    .then(critico => {
        res.status(200).send(critico);
    })
    .catch(error => {
        res.status(404).send(error);
    })
});

//DELETE
router.delete('/:uid',(req,res) => {
    const {uid} = req.params;
    Critico.findByIdAndRemove(uid).exec()
    .then(critico => {
        res.status(200).send(critico);
    })
    .catch(error => {
        res.status(404).send(error);
    })
});

module.exports = router;