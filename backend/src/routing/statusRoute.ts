import express from "express"
import { getStatus, setStatus } from "../controller/statusController"

const router=express.Router()


router.route("/status").post(setStatus)
router.route("/status/:userId").get(getStatus)

export default router

