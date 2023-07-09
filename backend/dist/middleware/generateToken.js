"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(id, email) {
    const token = jsonwebtoken_1.default.sign({
        userId: id,
        userEmail: email,
    }, process.env.SECRET_KEY, { expiresIn: "12h" });
    return token;
}
exports.default = generateToken;
//# sourceMappingURL=generateToken.js.map