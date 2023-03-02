import express from 'express'
import cors from 'cors'
import {router} from '../routes/usuarios.js'

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes()

    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuarioPath,router)
    }

    listen(){
        this.app.listen(this.port)
    }

}

export {
    Server
};
