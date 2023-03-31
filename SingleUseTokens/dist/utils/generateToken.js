"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.descryptText = exports.encryptText = exports.generateRandomString = exports.compareTextAndHash = exports.generateHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const cryptr_1 = __importDefault(require("cryptr"));
const saltRounds = 10;
const secretKey = "$3&17z@4z2Gx";
const salt = bcrypt_1.default.genSaltSync(saltRounds);
const generateHash = (text) => {
    return bcrypt_1.default.hashSync(text, salt);
};
exports.generateHash = generateHash;
const compareTextAndHash = (text, hash) => {
    return bcrypt_1.default.compareSync(text, hash);
};
exports.compareTextAndHash = compareTextAndHash;
const encryptText = (text) => {
    const cryptr = new cryptr_1.default(secretKey);
    return cryptr.encrypt(text);
};
exports.encryptText = encryptText;
const descryptText = (text) => {
    const cryptr = new cryptr_1.default(secretKey);
    return cryptr.decrypt(text);
};
exports.descryptText = descryptText;
const generateRandomString = (num) => {
    return [...Array(num)].map(() => {
        const randomNum = ~~(Math.random() * 36);
        return randomNum.toString(36);
    })
        .join('')
        .toUpperCase();
};
exports.generateRandomString = generateRandomString;
//# sourceMappingURL=generateToken.js.map