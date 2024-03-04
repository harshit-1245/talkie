import express, { Request, Response } from "express";
import cors from "cors"
import  connectDB  from "./database/db";

const app = express();
require("dotenv").config()
const port=process.env.PORT || 5000

connectDB()

app.use(cors())

app.listen(port, () => {
    console.log(`Server live at ${port}`);
});
