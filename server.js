//COMPONENTE APP
//importa el modulo expres
import express from "express";
//importa cors para permitir peticiones ajenas
import cors from "cors";
//importacion del modulo morgan
import morgan from "morgan";
//importando el lector de cookie
import cookieParser from "cookie-parser";

import http from "http";
import { Server as SocketIoServer } from "socket.io";


//importa las rutas del usuario
import authRoutes from "./routes/auth.route.js";
//importa las rutas de los productos
import productsRoutes from "./routes/products.route.js";

//inicializa la funcion con la constante
const app = express();

// Crea un servidor HTTP utilizando Express
const server = http.createServer(app);

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

// Configuración de Socket.IO
const io = new SocketIoServer(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado al servidor WebSocket.");

  socket.on("message", (message) => {
    console.log(`Mensaje recibido: ${message}`);
    // Aquí puedes enviar el mensaje a otros clientes o hacer lo que necesites.
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado del servidor WebSocket.");
  });
});

//exporta app y servidor websocket
export { app, server };