import  express  from "express";
import {createUser} from "../auth/register"
import verifyJwt from "../middlewares/verification";
import { loginUser } from "../auth/login";
import { friendRequest, getUser, sendFriendRequest } from "../controller/userController";
const router=express.Router()


router.route("/register").post(createUser)
router.route("/login").post(verifyJwt,loginUser)
router.route("/").get(getUser)
router.route("/friendRequest").post(sendFriendRequest)
router.route("/friendRequest/:userId").get(friendRequest)

export default router