import  express  from "express";
import {createUser} from "../auth/register"
import verifyJwt from "../middlewares/verification";
import { loginUser } from "../auth/login";
import { getUser } from "../controller/userController";
const router=express.Router()


router.route("/register").post(createUser)
router.route("/login").post(verifyJwt,loginUser)
router.route("/").get(getUser)

export default router