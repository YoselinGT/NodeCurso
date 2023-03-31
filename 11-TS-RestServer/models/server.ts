import express,{Application} from 'express'
import router from "../routes/usuarios";
import cors from 'cors'
import db from "../db/connection";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {

        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConection();

        this.middleware();

        //Definir mis rutas
        this.routes();
    }

    async dbConection(){
        try {
            await db.authenticate();
            console.log('Database esta en linea');
        } catch (error){
            console.log(error)
            throw new Error(error)
        }
    }

    middleware(){

        //CORS
        this.app.use(cors());

        //Lectura del boy
        this.app.use(express.json())

        //Capeta publica
        this.app.use(express.static('public'))

    }

    routes(){
        this.app.use(this.apiPaths.usuarios,router)
    }

    listen(){
        this.app.listen(this.port,()=> {
            console.log('Servidor corriendo en puerto '+this.port)
        })
    }

}

export default Server