import {response} from "express";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
import Categoria from '../models/categoria.js'
import Producto from '../models/producto.js'
import Usuario from '../models/usuario.js'

const coleccionesPermitidas = [
  'usuario',
  'categoria',
  'producto',
  'rol'
];

const buscarUsuario = async (termino = '', res = response) => {
    const esMongoId =  new ObjectId(termino);
    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const usuarios = await Usuario.find({nombre: termino})

    res.json({
        results: usuarios
    });
}


const buscar = (req,res = response) => {

    const {coleccion, termino} = req.params;
    console.log(coleccion, termino);

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion){
        case 'usuario':
            buscarUsuario(termino,res)
            break;
        case 'categoria':
            break;
        case 'productos':
            break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
            break;
    }
}


export  {
    buscar
};