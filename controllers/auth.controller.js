//importacion del modelo de usuario
import Usuario from "../models/user.model.js";
//importacion del modulo de encriptacion
import bcrypt from "bcryptjs";
//importacion del token
import CreateAccessToken from "../libs/jsonwebtoken.js";

//funcion register asyncrona
export const Register = async (request, response) => {
    //obtenemos los datos del objeto del json
    const {correo, contra, nombre} = request.body;
    try{
        //encripta la contraseña antes de enviarla al objeto
        const pswdhash = await bcrypt.hash(contra, 10);
        //crea un nuevo objeto usuario con el modelo
        const nuevoUsuario = new Usuario({
            correo,
            contra: pswdhash,
            nombre
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