import {response} from 'express'
import Usuario from '../models/usuario.js'
import bcryptjs from "bcryptjs";
import {generarJWT} from '../helpers/generar-jwt.js'
import {googleVerify} from "../helpers/google-verify.js";

const login = async (req,res= response) => {

    const {correo,password} = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg: 'Token / Password no son correctos - correo'
            })
        }

        //Verificar si el usuario esta activo en la base
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El usario no esta activo'
            })
        }

        //Verificar la contraseña
        const valPassword = bcryptjs.compareSync(password,usuario.contrasenia)
        if(!valPassword){
            return res.status(400).json({
                msg: 'Token / Password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            msg: 'Login ok',
            token,
            usuario
        })

    } catch (error){
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

const googleSignIn = async(req,res = response) => {
    const {id_token} = req.body;
    try {

        const {nombre,img,correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            const data = {
                nombre,
                correo,
                contrasenia: ':P',
                img,
                google: true,
                role: 'USER_ROLE'
            }

            usuario = new Usuario(data)
            await usuario.save();
        }

        //Si el usuario en DB
        if(!usuario.estado){
            return res.status(402).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error){
        res.status(500).json({
            ok:false,
            msg: 'El token no se pudo verificar'+error
        })
    }


}

export {
    login,
    googleSignIn
}