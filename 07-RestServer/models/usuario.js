import {Schema,model} from 'mongoose';

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    contrasenia: {
        type: String,
        required: [true, 'El contraseña es obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function(){
    const {__v,contrasenia,_id,...user} = this.toObject()
    user.uid = _id
    return user

}

const Usuario =  model('Usuario', UsuarioSchema);

export default Usuario
