"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = require("../controllers/token");
const router = (0, express_1.Router)();
router.get('/:token', token_1.isTokenValid);
router.post('/', token_1.genToken);
exports.default = router;
//# sourceMappingURL=token.js.map