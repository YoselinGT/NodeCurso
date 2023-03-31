"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('Token', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    //logging: false
});
exports.default = db;
//owner Usuario @relation(fields: [iownerid], references: [iusuarioid])
//rel_usuariorganizacionrole rel_usuariorganizacionrole[]
//TODO agregar relacion de usuario y cat roles
//# sourceMappingURL=connection.js.map