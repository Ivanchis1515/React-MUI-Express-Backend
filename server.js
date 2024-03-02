//COMPONENTE APP

//importa el modulo expres
import express from "express";
//importa cors para permitir peticiones ajenas
import cors from "cors";
//importacion del modulo morgan
import morgan from "morgan";
//importando el lector de cookie
import cookieParser from "cookie-parser";

//importa las rutas del usuario
import authRoutes from "./routes/auth.route.js";
//importa las rutas de los productos
import productsRoutes from "./routes/products.route.js";

//inicializa la funcion con la constante
const app = express();

//configuracion específica de CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, //habilita el intercambio de cookies
  };
//permitir peticiones desde diferentes origenes con cors
app.use(cors(corsOptions));

//app utiliza el componente morgan para recibir mensajes de url
app.use(morgan("dev"));

//usa el componente express para convertir en objeto js
app.use(express.json());
//convierte las cookies a json
app.use(cookieParser());

//usa las rutas iniciando por /api
app.use("/api", authRoutes);
app.use("/api", productsRoutes);

export default app;