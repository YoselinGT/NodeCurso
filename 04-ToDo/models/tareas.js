import { v4 as uuidv4 } from 'uuid';
import {Tarea} from "./tarea.js";

class Tareas {

    _listado = {};

    get listadoArr(){
        const listado = []
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })


        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    crearTareasFromArray(tareas = []){

        tareas.forEach(tarea => {
            console.log(tarea.id);
            console.log(tarea);
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea
    }

    listadoCompleto(){

        this.listadoArr.forEach((tarea,i) => {
            const idx= `${i+1}`;
            const {desc,completado} = tarea;
            const estado = (completado) ? 'Completado'.green : 'Pendiente'.red;
            console.log(`${ idx }  ${ desc } :: ${ estado }` )
        })

    }

    listarPendientesCompletadas(completadas = true){
        let contador = 0;
        this.listadoArr.forEach((tarea,i) => {
            const {desc,completado} = tarea;
            const idx= `${i+1}`;
            if(completadas){
                if(completado){
                    contador +=1;
                    console.log(`${ contador.toString().green}.  ${ desc.green } :: ${ completado }` );
                }
            } else {
                if(!completado){
                    contador +=1;
                    console.log(`${ contador.toString().red}.  ${ desc.red } :: ${completado}` );
                }
            }
        })
    }

    toggleCompletadas (ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completado){
                tarea.completado = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completado = null;
            }
        })
    }
}

export { Tareas }