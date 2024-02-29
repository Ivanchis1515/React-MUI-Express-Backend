//importa el jsonwebtoken
import jwt from "jsonwebtoken";
//importa el token 
import { TOKEN } from "../config/config.js";

const CreateAccessToken = (payload) => {
    //creamos una promesa para ejecutar el token
    return new Promise((resolve, reject) => {
        //creacion del token 
        jwt.sign(
            payload,
            TOKEN, //clave con la que se cifra el token 
            {expiresIn:"1d"},
            (err, token) => {
                if(err) reject(err);
                resolve(token);
            }
        );
    });
}
export default CreateAccessToken;