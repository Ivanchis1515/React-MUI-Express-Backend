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
    }
},{
    timestamps: true //guarda la fecha en la que se creo el usuario
})
//con el modelo establecido comienza a interactuar con la base
export default mongoose.model("usuarios", usuarioSchema);