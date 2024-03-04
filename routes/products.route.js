//importacion del metodo router de express
import { Router } from "express";
import { authRequired } from "../middleware/validateToken.js";

//importa las funcione del controlador
import { getProducts, getProductsbyId, createProduct, deleteProducts, updateProducts } from "../controllers/products.controller.js";

//asigna el metodo a una constante
const router = Router();

router.get("/Products", authRequired, getProducts);
router.get("/Product/:id", authRequired, getProductsbyId);
router.post("/Create", authRequired, createProduct);
router.delete("/Delete/:id", authRequired, deleteProducts);
router.put("/Update/:id", authRequired, updateProducts);

export default router;