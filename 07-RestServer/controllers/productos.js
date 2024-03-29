import {response} from "express";
import Producto from "../models/Producto.js";

const crearProducto = async (req, res = response) => {

    const {estado,usuario,...body} = req.body;

    //Generar la data a guardar
    const data = {
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
        ...body
    }

    const productoDB = await Producto.findOne({nombre:data.nombre});

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        })
    }



    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto);


}

const obtenerProductos = async (req, res = response) => {

    const {limite = 5,desde = 0} = req.query

    const query = {estado:true}

    const [total,productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).
        skip(Number(desde)).
        limit(Number(limite)).populate('usuario','nombre')
    ])

    res.status(200).json({
        total,
        productos
    })


}


const obtenerProducto = async (req, res = response) => {

    const {id} = req.params;

    const producto = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre')

    res.status(200).json({
        producto
    })
}

const actualizarProducto = async (req, res = response) => {
    const {id} = req.params
    const {_id,estado,usuario,...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});

    res.status(200).json({
        producto
    })
}

//borrarCategoria - estado - false
const borrarProducto = async (req, res = response) => {
    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new:true})

    res.status(200).json({
        producto
    })
}


export {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}