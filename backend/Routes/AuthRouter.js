import { Router } from "express";
import {signupValidation , loginValidation} from "../Middleware/AuthValidation.js"
import {signup ,login} from "../Controllers/AuthController.js"
const router = Router();


router.post('/login' ,loginValidation , login )

router.post('/signup' ,signupValidation , signup)

router.post('/logout' , (req , res) => {
    res.send("logout success");
})


export default router;
