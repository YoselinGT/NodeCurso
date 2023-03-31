import Role from "../models/role.js";
import Usuario from "../models/usuario.js";
import Categoria from "../models/categoria.js";
import Producto from "../models/producto.js";

const esRolValido= async (role = '') => {
    const existeRol = await Role.findOne({role})
    if(!existeRol){
        throw new Error(`El rol ${role} no está registrado en la base de datos`)
    }
}

const esEmailUnico = async (correo = '') => {
    const exiteEmain = await Usuario.findOne({correo})
    if(exiteEmain){
        throw new Error('El correo ya esta regitrados')

    }

}

const existeUsuarioPorId = async (id = '') => {
    //console.log(id)
    const exiteUsuario = await Usuario.findById(id)
    if(!exiteUsuario){
        throw new Error('El id no existe')

    }
}

const existeCategoriaPorId = async (id = '') => {

    const categoria = await Categoria.findById(id)
    if(!categoria){
        throw new Error('El id no existe')

    }
}

const existeProductoPorId = async (id = '') => {

    const producto = await Producto.findById(id)
    if(!producto){
        throw new Error('El id no existe')

    }
}

export {
    esRolValido,
    esEmailUnico,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}