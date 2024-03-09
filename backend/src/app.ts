import express, { Request, Response } from "express";
import cors from "cors"
import userRouter from "./routing/userRoute"
import  connectDB  from "./database/db";
import cookieParser from "cookie-parser";

const app = express();
require("dotenv").config()
const port=process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/",userRouter)

app.listen(port, () => {
    console.log(`Server live at ${port}`);
});
