const fs = require('fs')
const colors = require('colors')

const crearArchivo = async (base = 5,listar,hasta) => {

    console.log("===================".green);
    console.log('   Tabla del :'.green ,colors.green(base)   )
    console.log("===================".green);

    try {
        let salida = '';
        let consola = ''
        for (let i= 1; i <= hasta; i++ ){
            salida += `${i} x ${base} = ${i*base} \n`
            consola += `${i} ${'x'.green} ${base} ${'='.green} ${i*base} \n`
        }

        if(listar){
            console.log(consola)
        }

        await fs.writeFileSync(`./salida/tabla-${base}.txt`,salida);

        return `tabla-${base}.txt creada`;
    } catch (err) {
        throw err
    }


}

module.exports = {
    crearArchivo
}