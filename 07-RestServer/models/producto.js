import {Schema,model} from "mongoose";
import mongoose from "mongoose";

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion:{
        type:String
    },
    disponible: {
        type: Boolean,
        default: true
    }
})

ProductoSchema.methods.toJSON = function(){
    const {__v,_id,estado,...producto} = this.toObject()
    producto.uid = _id
    return producto

}

const Producto =  mongoose.models['Producto'] ||  model('Producto',ProductoSchema)

export default Producto