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
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("./config/database"));
const userModel_1 = __importDefault(require("./models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated_middleware_1 = __importDefault(require("./middleware/isAuthenticated.middleware"));
dotenv.config();
const app = (0, express_1.default)();
(0, database_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send({ message: "Working" });
    console.log("Working");
});
app.put("/update", isAuthenticated_middleware_1.default, (req, res) => {
    const updatedUser = req.body;
    userModel_1.default.findOne({ email: updatedUser.email })
        .then(user => {
        if (user) {
            if (updatedUser.name) {
                user.name = updatedUser.name;
            }
            if (updatedUser.bio) {
                user.bio = updatedUser.bio;
            }
            if (updatedUser.mobile) {
                user.mobile = updatedUser.mobile;
            }
            if (updatedUser.name) {
                user.mobile = updatedUser.mobile;
            }
            user.save();
        }
        else {
            res.status(400).send({ message: "User not found" });
        }
    });
    res.status(200).json({ message: "User updated Successfully" });
});
app.post("/register", (req, res) => {
    userModel_1.default.findOne({ email: req.body.email })
        .then(user => {
        if (!user) {
            bcrypt_1.default.hash(req.body.password, 5)
                .then((hashedPassword) => {
                const user = new userModel_1.default({
                    email: req.body.email,
                    password: hashedPassword
                });
                user.save()
                    .then((result) => {
                    res.status(201).send({ message: "User saved successfully", user: result });
                })
                    .catch((e) => {
                    res.status(500).send({ message: "User didn't save successfully", error: e });
                });
            })
                .catch((e) => {
                res.status(500).send({ message: "Password didn't hash successfully", error: e });
            });
        }
        else {
            res.status(201).send({ message: "User already exists" });
        }
    });
});
app.post("/login", (req, res) => {
    userModel_1.default.findOne({ email: req.body.email })
        .then((user) => {
        bcrypt_1.default.compare(req.body.password, user.password)
            .then((check) => {
            if (!check) {
                res.status(400).send({ message: "Password is not correct" });
            }
            const token = jsonwebtoken_1.default.sign({
                userId: user._id,
                userEmail: user.email,
            }, process.env.SECRET_KEY, { expiresIn: "24h" });
            res.status(200).send({
                message: "User logged in successfully",
                user: user,
                token: token
            });
        })
            .catch((e) => {
            res.status(400).send({
                message: "Password is not correct",
                error: e
            });
        });
    })
        .catch((e) => {
        res.send({ message: "Email not found", error: e });
    });
});
app.get("/get/:email", (req, res) => {
    const email = req.params.email;
    userModel_1.default.findOne({ email: email })
        .then(user => {
        res.status(200).json({ message: "Retrieved data successfully", user: user });
    });
});
app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map