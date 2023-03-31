import {Router}  from 'express';
import {check} from "express-validator";

import {tieneRole, validarCampos, validarJWT} from '../middlewares/index.js';
import {obtenerProducto, obtenerProductos,crearProducto,actualizarProducto,borrarProducto} from '../controllers/productos.js'
import {existeCategoriaPorId,existeProductoPorId} from '../helpers/db-validators.js'

const router = Router()

router.get('/',obtenerProductos);

router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('categoria','No es un ID válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto);

//actualizar un registro por id - privado - cualquiera con token valido
router.put('/:id',[
        validarJWT,
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarCampos
    ],
    actualizarProducto)

router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROL','VENTAS_ROL'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto)

export {
    router
}