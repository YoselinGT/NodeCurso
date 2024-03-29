import {response} from "express";
import Categoria from "../models/categoria.js";
import Usuario from "../models/usuario.js";

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

   res.status(201).json(categoria);


}

//ObtenerCategorias - pagina - total - populate(El ultimos usuario que ha manipulado el registro)

const obtenerCategorias = async (req, res = response) => {

    const {limite = 5,desde = 0} = req.query

    const query = {estado:true}

    const [total,usuarios] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).
        skip(Number(desde)).
        limit(Number(limite)).populate('usuario','nombre')
    ])

    res.status(200).json({
        total,
        usuarios
    })


}

//ObtenerCategoria  - populate {}
const obtenerCategoria = async (req, res = response) => {

    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate('usuario','nombre')

    res.status(200).json({
        categoria
    })
}

//actualizarCategoria
const actualizarCategoria = async (req, res = response) => {
    const {id} = req.params
    const {_id,estado,usuario,...data} = req.body;


    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});

    res.status(200).json({
        categoria
    })
}

//borrarCategoria - estado - false
const borrarCategoria = async (req, res = response) => {
    const {id} = req.params;

    //Borrar fisicamente el registro
    //const usuario = await Token.findByIdAndDelete(id)

    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true})

    res.status(200).json({
        categoria
    })
}


export {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}