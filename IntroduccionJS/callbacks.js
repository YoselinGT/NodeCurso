const getUsuarioById  = (id,callback) => {
    const usuario = {
        id,
        nombre: 'Yoselin'
    }

    setTimeout( () =>{
        callback(usuario)
    },1500)
}

getUsuarioById(10,(usuario)=> {
    console.log(usuario)
})