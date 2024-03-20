//importa mongoose
import mongoose from "mongoose";
//crea un esquema a partir de los datos de mongoose
const usuarioSchema =  new mongoose.Schema({
    nombre:{
        type: String, //tipo de dato cadena
        required: true, //que sea requerido 
        trim: true //limpia la cadena si es que contiene espacios
    },
    correo:{
        type: String, //tipo de dato cadena
        required: true, //que sea requerido 
        trim: true, //limpia la cadena si es que contiene espacios
        unique: true //cada correo que sea unico
    },
    contra:{
        type: String, //tipo de dato cadena
        required: true, //que sea requerido 
        trim: true //limpia la cadena si es que contiene espacios
    },
    rol:{
        type: String, //tipo de dato cadena
        required: true, //que sea requerido 
    },
    resetToken: {
        type: String, // Tipo de dato cadena para almacenar el token
        default: null // Valor por defecto es nulo, ya que al principio no hay token
    },
    resetTokenExpires: {
        type: Date, // Tipo de dato fecha para almacenar la fecha de expiración del token
        default: null // Valor por defecto es nulo, ya que al principio no hay token
    }
},{
    timestamps: true //guarda la fecha en la que se creo el usuario
});
//con el modelo establecido comienza a interactuar con la base
export default mongoose.model("usuarios", usuarioSchema);