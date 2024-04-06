import express from "express"
import { getChat, getMessage, sendMessage } from "../controller/messageController";


const router=express.Router()
router.route("/messages").get(getMessage)
router.route("/sendMessage").post(sendMessage)
router.route("/message/:senderId/:recepientId").get(getChat);


export default router;