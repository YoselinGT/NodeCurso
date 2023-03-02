import colors from 'colors';
//const {mostrarMenu,pausa} = require('./helpers/mensajes')
import {inquirerMenu,inquirePause,inquireQuestion,listadoTareasBorrar,confirmar,mostrarListadoCheckList} from './helpers/inquirer.js'
import {guardarDB,leerDB} from './helpers/guardarArchivo.js'
import {Tareas} from './models/tareas.js'

const main = async () => {

    let opt = '';

    /*const tarea = new Tarea("desc");
    console.log(tarea);*/

    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.crearTareasFromArray(tareasDB)
    }

    do{
        opt = await inquirerMenu();

        switch (opt){
            case '1':
                const desc = await inquireQuestion('Descripcion: ')
                tareas.crearTarea(desc)
                break;
            case '2':
                tareas.listadoCompleto();
                //console.log(tareas.listadoArr)
                break;
            case '3':
                tareas.listarPendientesCompletadas(true)
                break;
            case '4':
                tareas.listarPendientesCompletadas(false)
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if(id !== '0'){
                    const ok = await confirmar('¿Esta seguro?')
                    if(ok){
                        tareas.borrarTarea(id)
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr);
        await inquirePause();

    } while ( opt !== '0');

}

main();