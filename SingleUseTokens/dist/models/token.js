"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const connection_1 = __importDefault(require("../db/connection"));
const prisma = new client_1.PrismaClient();
const Token = connection_1.default.define('tokens', {
    vtoken: {
        type: DataTypes.STRING
    },
    iiused: {
        type: DataTypes.BOOLEAN
    },
    dtvigencia: {
        type: DataTypes.DATE
    },
    iusuarioid: {
        type: DataTypes.INTEGER
    },
    isolicitudid: {
        type: DataTypes.INTEGER
    }
});
exports.default = Token;
//# sourceMappingURL=token.js.map