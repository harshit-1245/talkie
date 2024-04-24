import express from "express"
import { setStatus } from "../controller/statusController"

const router=express.Router()


router.route("/status").post(setStatus)

export default router

