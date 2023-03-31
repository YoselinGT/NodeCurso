import {response} from 'express'
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js'

const validarJWT = async (req,res = response,next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:"No hay token en la peticion"
        })
    }

    try{

        const {uid}  = jwt.verify(token,process.env.SECRETKEY);

        //Leer el usuario que corresponde al uid
        const usuarioAutenticado = await Usuario.findById(uid);

        if(!usuarioAutenticado){
            return  res.status(401).json({
                msg: "Token no valido - usuario no existe en DB"
            })
        }

        //Verificar si el uuid esta activo

        if(!usuarioAutenticado.estado){
            return res.status(401).json({
                msg: "Token no valido - usuario inactivo"
            })
        }

        req.usuario = usuarioAutenticado;

        next();
    } catch (error){
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

export {
    validarJWT
}