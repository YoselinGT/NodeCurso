import {Router}  from 'express';
import {check} from "express-validator";

import {tieneRole, validarCampos, validarJWT} from '../middlewares/index.js';
import {crearCategoria,obtenerCategorias,obtenerCategoria,actualizarCategoria,borrarCategoria} from "../controllers/categorias.js";
import {existeCategoriaPorId} from '../helpers/db-validators.js'

const router = Router()

router.get('/',obtenerCategorias);

router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

//actualizar un registro por id - privado - cualquiera con token valido
router.put('/:id',[
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ],
    actualizarCategoria)

//Borrar una categoria - admin
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROL','VENTAS_ROL'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria)

export {
    router
}