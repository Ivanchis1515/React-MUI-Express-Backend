//importacion del metodo router de express
import { Router } from "express";
import { authRequired } from "../middleware/validateToken.js";

//asigna el metodo a una constante
const router = Router();

router.get("/Products", authRequired, (req, res) => res.send("productos"));

export default router;