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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenValid = exports.genToken = void 0;
const client_1 = require("@prisma/client");
const generateToken_1 = require("../utils/generateToken");
const dates_1 = require("../utils/dates");
const prisma = new client_1.PrismaClient();
const isTokenValid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        //console.log(token);
        const { ireferenciaid, icattokenid } = req.query;
        //1. Seleccionamos el hash de la base para comparalo con el token que nos estan mandando
        const rsToken = yield prisma.token.findMany({
            where: {
                icattokenid: Number(icattokenid),
                ireferenciaid: Number(ireferenciaid),
                iused: false
            }
        });
        //2. Validamos que tengamos token en la base
        if (rsToken.length === 0) {
            throw new Error("El token es invalido: no existe en la base");
        }
        //3. Validamos que el token este vigente
        const startDate = (0, dates_1.getCurrentTimeAndDate)();
        //console.log("startDate"+startDate);
        const endDate = (0, dates_1.formatDate)(String(rsToken[0].dtvigencia));
        //console.log("endDate"+endDate);
        const isCurrentToken = (0, dates_1.compareDates)(endDate, startDate);
        if (!isCurrentToken) {
            throw new Error("El token no esta vigente");
        }
        //4. Comparamos el hash y el token
        const isValidToken = (0, generateToken_1.compareTextAndHash)(token, rsToken[0].vtoken);
        if (!isValidToken) {
            throw new Error("El token no es valido");
        }
        //5. Desactivamos el token
        rsToken.map((token) => __awaiter(void 0, void 0, void 0, function* () {
            const post = yield prisma.token.update({
                where: { itokenid: token.itokenid },
                data: { iused: true },
            });
        }));
        //6. Regresamos en la respuesta el token
        res.json({
            msg: "El token es valido"
        });
    }
    catch (err) {
        res.status(500).json({
            msg: String(err)
        });
    }
});
exports.isTokenValid = isTokenValid;
const genToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        //1. Generamos el token ramdom y el hash para guardarlo en base
        const token = (0, generateToken_1.generateRandomString)(6);
        const tokenEnc = (0, generateToken_1.generateHash)(token);
        body.vtoken = tokenEnc;
        //2. Obtenemos la vigencia del token
        const date = (0, dates_1.getCurrentTimeAndDate)();
        const vigencia = (0, dates_1.addHoursToADate)(date, body.vigencia || 1);
        body.dtvigencia = vigencia;
        //3. Guardamos el token en base
        const rsToken = yield prisma.token.create({
            data: body
        });
        //4. Regresamos en la respuesta el token
        res.json({
            token,
            //rsToken
        });
    }
    catch (err) {
        res.status(500).json({
            msg: String(err)
        });
    }
});
exports.genToken = genToken;
//# sourceMappingURL=token.js.map