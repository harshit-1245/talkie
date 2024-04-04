import  express  from "express";
import {createUser} from "../auth/register"
import verifyJwt from "../middlewares/verification";
import { loginUser } from "../auth/login";
import { acceptRequest, friendDetail, friendRequest, getUser, sendFriendRequest,friendList } from "../controller/userController";
const router=express.Router()


router.route("/register").post(createUser)
router.route("/login").post(verifyJwt,loginUser)
router.route("/").get(getUser)
router.route("/friendRequest").post(sendFriendRequest)
router.route("/friendRequest/:userId").get(friendRequest)
router.route("/accept/:userId").post(acceptRequest)
router.route("/getRecepient/:userId").get(friendDetail)
router.route("/friendList/:userId").get(friendList)

export default router