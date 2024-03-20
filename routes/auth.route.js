//importacion del metodo router de express
import { Router } from "express";
//import los controladores 
import { Register, Login, Logout, Profile, ForgotPassword, Restablecer } from "../controllers/auth.controller.js";
//importa la validacion del token de usuario
import { authRequired } from "../middleware/validateToken.js";

//asigna el metodo a una constante
const router = Router();

//registro de usuarios
router.post("/Register", Register);
router.post("/Login", Login);
router.post("/Logout", Logout);
router.post("/Forgotpassword", ForgotPassword);
router.post("/Restablecer", Restablecer);
router.get("/Profile", authRequired, Profile);

export default router;