//importacion del modelo de usuario
import Usuario from "../models/user.model.js";
//importacion del modulo de encriptacion
import bcrypt from "bcryptjs";
//importacion del token
import CreateAccessToken from "../libs/jsonwebtoken.js";
import crypto from "crypto";
//importacion del mensajero de correo
import { sendEmail } from "../libs/email.js";

//funcion register asyncrona
export const Register = async (request, response) => {
    //obtenemos los datos del objeto del json
    const {correo, contra, nombre, rol} = request.body;
    try{
        //encripta la contraseña antes de enviarla al objeto
        const pswdhash = await bcrypt.hash(contra, 10);
        //crea un nuevo objeto usuario con el modelo
        const nuevoUsuario = new Usuario({
            correo,
            contra: pswdhash,
            nombre,
            rol
        });
        console.log(nuevoUsuario);
        //crea una respuesta asyncrona guardando el usuario
        const usuarioGuardado = await nuevoUsuario.save();
        const token = await CreateAccessToken({id: usuarioGuardado._id})

        //crea el token
        response.cookie("token", token);

        //devuelve los datos al front en formato json
        response.json({
            id: usuarioGuardado._id,
            nombre: usuarioGuardado.nombre,
            correo: usuarioGuardado.correo,
            rol: usuarioGuardado.rol,
            createdAt: usuarioGuardado.createdAt,
            updateAt: usuarioGuardado.updatedAt
        });
    }
    catch(error){
        response.status(500).json({"message":error.message});
    }
};

export const Login = async (request, response) => {
    //obtenemos los datos del objeto del json
    const {correo, contra} = request.body;
    try{
        //buscamos al usuario para ver si existe
        const usuarioFound = await Usuario.findOne({correo})
        //si no encunetra resultados
        if(!usuarioFound){
            return response.status(400).json({message:"Usuario no encontrado"});
        }
        
        //compara la contraseña con la contraseña hash
        const contraMatch = await bcrypt.compare(contra, usuarioFound.contra);
        //si no coincidieron las contraseñas
        if(!contraMatch){
            return response.status(400).json({message:"Contraseña incorrecta"});
        }

        //crea el token
        const token = await CreateAccessToken({id: usuarioFound._id})
        response.cookie("token", token); //guardalo como una cookie

        //devuelve los datos al front en formato json
        response.json({
            id: usuarioFound._id,
            nombre: usuarioFound.nombre,
            correo: usuarioFound.correo,
            rol: usuarioFound.rol,
            createdAt: usuarioFound.createdAt,
            updateAt: usuarioFound.updatedAt
        });
    }
    catch(error){
        response.status(500).json({"message":error.message});
    }
};

export const Logout = (request, response) => {
    response.cookie("token", "", {
        expires: new Date(0)
    });
    return response.sendStatus(200);
};

export const ForgotPassword = async(request, response) => {
    //obtenemos los datos del objeto del json
    const { correo } = request.body;
    console.log(correo);
    try{
        const usuarioFound = await Usuario.findOne({correo}) //busca al usuario por el correo y trae los registros
        //si no encunetra resultados
        if(!usuarioFound){
            return response.status(400).json({message:"Usuario no encontrado"});
        }
    
        //si el usuario existe 
        //genera un token aleatorio
        const token = crypto.randomBytes(20).toString('hex');
    
        //asigna el token y la fecha de expiración al usuario
        usuarioFound.resetToken = token;
        usuarioFound.resetTokenExpires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 horas en milisegundos
    
        //guardar el usuario en la base de datos
        await usuarioFound.save();

        // Envía el correo electrónico utilizando la función sendEmail
        await sendEmail(
            correo,
            'Recuperación de contraseña',
            `Hola,\n\nHaz clic en el siguiente enlace para restablecer tu contraseña:\n\nhttp://localhost:5173/restablecer?token=${token}\n\nSi no solicitaste este cambio, puedes ignorar este correo electrónico.\n\nSaludos,`
        );
        
        return response.sendStatus(200); //envia status 200 OK
    } catch(error){
        return response.status(500).json({ message: 'Error al procesar la solicitud' });
    }
};

export const Restablecer = async(request, response) => {
    const { token, newPassword } = request.body;

    try {
        // Buscar al usuario por el token de restablecimiento de contraseña
        const usuarioFound = await Usuario.findOne({ resetToken: token });

        if (!usuarioFound) {
            return response.status(400).json({ message: "Token inválido" });
        }

        // Verificar si el token ha expirado
        if (usuarioFound.resetTokenExpires < Date.now()) {
            return response.status(400).json({ message: "El token ha expirado" });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña del usuario en la base de datos
        usuarioFound.contra = hashedPassword;
        usuarioFound.resetToken = undefined;
        usuarioFound.resetTokenExpires = undefined;
        await usuarioFound.save();

        return response.sendStatus(200); // Respuesta exitosa
    } catch (error) {
        return response.status(500).json({ message: "Error al restablecer la contraseña" });
    }
};

export const Profile = async(request, response) => {
    //ya que tenemos el token hacemos la consulta
    const usuarioFound = await Usuario.findById(request.user.id);
    //si no hay ningun usuario
    if(!usuarioFound){
        return response.status(400).json({message:"Usuario no encontrado"});
    }
    //devuelve los datos al front en formato json
    return response.json({
        id: usuarioFound._id,
        nombre: usuarioFound.nombre,
        correo: usuarioFound.correo,
        createdAt: usuarioFound.createdAt,
        updateAt: usuarioFound.updatedAt
    });
    // response.send("profile");
}