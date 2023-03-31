"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_1 = __importDefault(require("../routes/token"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            token: '/api/singleusetoken'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8081';
        this.dbConection();
        this.middleware();
        this.routes();
    }
    dbConection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database esta en linea');
            }
            catch (error) {
                console.log(error);
                //throw new Error(error)
            }
        });
    }
    middleware() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura del boy
        this.app.use(express_1.default.json());
        //Capeta publica
        this.app.use(express_1.default.static('public'));
        //Sequelize ORM models
    }
    routes() {
        this.app.use(this.apiPaths.token, token_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map