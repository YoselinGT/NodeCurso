import {response} from 'express'
import bcryptjs from 'bcryptjs'
import Usuario from '../models/usuario.js'

const usuariosGet = async (req, res = response) => {

    const {limite = 5,desde = 0} = req.query

    const query = {estado:true}

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).
        skip(Number(desde)).
        limit(Number(limite))
    ])

    res.status(200).json({
        msg: 'get  API - controlador',
        total,
        usuarios
    })
}

const usuariosPut = async(req, res) => {
    const {id} = req.params
    const {_id,contrasenia,google,correo,role,...resto} = req.body;

    //TODO: validac ontrase base de datos
    if(contrasenia){
        const salt = bcryptjs.genSaltSync(10);
        resto.contrasenia  = bcryptjs.hashSync(contrasenia,salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.status(200).json({
        msg: 'put  API - controlador',
        usuario
    })
}

const usuariosPost = async (req, res) => {



    const {nombre,correo, contrasenia,role} = req.body
    const usuario = new Usuario({nombre,correo,contrasenia,role})

    //Encriptar la contaseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.contrasenia  = bcryptjs.hashSync(contrasenia,salt)

    //Guardar en base de datos
    await usuario.save();

    res.status(201).json({
        msg: 'post  API - controlador',
        usuario
    })
}

const usuariosDelete = async (req, res) => {

    const {id} = req.params;

    //Borrar fisicamente el registro
    //const usuario = await Token.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})

    res.status(200).json({
        usuario
    })
}

export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}