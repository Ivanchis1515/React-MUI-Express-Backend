//importa el servidor
import {app, server} from "./server.js";
import connectDB from "./config/database.js";

//establece el puerto
const puerto = 3000;

//conectate primero a la base
connectDB();
//escucha el puerto 3000, es decir arranca en dicho puerto
server.listen(puerto, () => {
    console.log(`Servidor en puerto: ${puerto}`);
})