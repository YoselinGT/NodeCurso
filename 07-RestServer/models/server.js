import express from 'express'
import cors from 'cors'
import {router} from '../routes/usuarios.js'
import {routerAuth} from '../routes/auth.js'
import {router as routerCategorias} from '../routes/categorias.js'
import {router as routerProductos} from '../routes/productos.js'
import {router as routerBuscar} from '../routes/buscar.js'
import {dbConnection} from "../database/config.js";

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar'
        }

        //Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes()

    }

    async conectarDB(){
        await dbConnection();
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
        this.app.use(this.paths.auth,routerAuth)
        this.app.use(this.paths.usuarios,router)
        this.app.use(this.paths.categorias,routerCategorias),
        this.app.use(this.paths.productos,routerProductos)
        this.app.use(this.paths.buscar,routerBuscar)
    }

    listen(){
        this.app.listen(this.port)
    }

}

export {
    Server
};
