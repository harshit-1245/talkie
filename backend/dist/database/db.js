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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MONGODB_URL = process.env.MONGODB_URL;
        if (!MONGODB_URL) {
            throw new Error("MongoDB URL is not provided in the environment variables.");
        }
        yield mongoose_1.default.connect(MONGODB_URL);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
});
exports.default = connectDB;
