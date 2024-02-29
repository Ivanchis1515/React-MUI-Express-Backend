//importacion de la libreria jwt
import jwt from "jsonwebtoken";
//importa la clave secreta del token
import { TOKEN } from "../config/config.js";

//funcion middleware que valida el suusario
export const authRequired =  (request, response, next) => {
    //obten el token de las cookies
    const {token} = request.cookies;

    //si no recibe un token 
    if(!token){
        return response.status(401).json({message:"No token, acceso denegado"});
    }

    //verifica el token con el token existente
    jwt.verify(token, TOKEN, (err, user) => {
        if(err){
            return response.status(401).json({message:"Token inválido"});
        }
        //todo lo que esta decodificando lo guardo en request
        request.user = user
        
        next() //continua validando las rutas
    });
}