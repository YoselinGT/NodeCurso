const argv = require('yargs')
    .options({
        'b': {
            alias: 'base',
            type: 'number',
            demandOption: true,
            describe: 'Es la base de la tabla de multiplicar'
        },
        'l': {
            alias: 'listar',
            type: 'boolean',
            default: false,
            describe: 'Indica si se va a listar en consola los resultados de la tabla '
        },
        'h': {
            alias: 'hasta',
            type: 'number',
            default: 10,
            describe: 'Indica hasta que numero se va a multiplicar la base'
        }
    })
    .check((argv,options) => {
        if(isNaN(argv.base)){
            throw 'La base tiene que ser un numero'
        }
        return true;
    })
    .argv;

module.exports = argv
