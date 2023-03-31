import {response} from 'express'

const esAdminRole = (req,res = response,next) => {

   if(!req.usuario){
       return res.status(500).json({
           msg:"Se quiere verificar el rol sin validar el token primero"
       })
   }

   const {role,nombre} = req.usuario;

   if(role !== 'ADMIN_ROL'){
       return res.status(401).json({
           msg: "No es administrador"
       })
   }

    next();
}

const tieneRole = (...roles) => {
    return (req,res = response,next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg:"Se quiere verificar el rol sin validar el token primero"
            })
        }

        console.log(req.usuario);
        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();
    }
}

export {
    esAdminRole,
    tieneRole
}