import {response} from 'express'

const usuariosGet = (req, res = response) => {

    const query = req.query;

    res.status(200).json({
        msg: 'get  API - controlador',
        query
    })
}

const usuariosPut = (req, res) => {
    const {id} = req.params

    res.status(200).json({
        msg: 'put  API - controlador',
        id
    })
}

const usuariosPost = (req, res) => {

    const body = req.body

    res.status(201).json({
        msg: 'post  API - controlador',
        body
    })
}

const usuariosDelete = (req, res) => {
    res.status(200).json({
        msg: 'delete  API - controlador'
    })
}

export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}