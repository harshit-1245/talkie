"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./database/db"));
const app = (0, express_1.default)();
require("dotenv").config();
const port = process.env.PORT || 5000;
(0, db_1.default)();
app.use((0, cors_1.default)());
app.listen(port, () => {
    console.log(`Server live at ${port}`);
});
