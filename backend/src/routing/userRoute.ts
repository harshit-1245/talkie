import  express  from "express";
import {createUser} from "../auth/register"
import verifyJwt from "../middlewares/verification";
import { loginUser } from "../auth/login";
const router=express.Router()


router.route("/register").post(createUser)
router.route("/login").post(verifyJwt,loginUser)

export default router