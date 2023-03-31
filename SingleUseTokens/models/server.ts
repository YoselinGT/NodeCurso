import express,{Application} from 'express'
import token from "../routes/token";
import cors from 'cors'
import db from "../db/connection";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        token: '/api/singleusetoken'
    }

    constructor() {

        this.app = express();
        this.port = process.env.PORT || '8081';

        this.dbConection();

        this.middleware();

        this.routes();
    }

    async dbConection(){
        try {
            await db.authenticate();
            console.log('Database esta en linea');
        } catch (error){
            console.log(error)
            //throw new Error(error)
        }
    }

    middleware(){

        //CORS
        this.app.use(cors());

        //Lectura del boy
        this.app.use(express.json());

        //Capeta publica
        this.app.use(express.static('public'));

        //Sequelize ORM models
    }

    routes(){
        this.app.use(this.apiPaths.token,token)
    }

    listen(){
        this.app.listen(this.port,()=> {
            console.log('Servidor corriendo en puerto '+this.port)
        })
    }

}

export default Server