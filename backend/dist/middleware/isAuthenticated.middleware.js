"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const userModel_1 = __importDefault(require("../models/userModel"));
dotenv.config();
function isAuthenticated(req, res, next) {
    console.log(req.headers.authorization);
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authToken.split(" ")[1];
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const isUserValid = userModel_1.default.findOne({ _id: user.userId });
        if (!isUserValid) {
            return res.status(401).json({ message: "This token is invalid" });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "This token is invalid", error });
    }
}
exports.default = isAuthenticated;
//# sourceMappingURL=isAuthenticated.middleware.js.map