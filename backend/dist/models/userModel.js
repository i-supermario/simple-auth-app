"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email exists"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false
    },
    name: {
        type: String,
        required: false,
    },
    mobile: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=userModel.js.map