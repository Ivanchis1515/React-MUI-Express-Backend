//importa mongoose
import mongoose from "mongoose";

//crea un esquema a partir de los datos de mongoose
const productSchema = new mongoose.Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId, //usa el tipo de dato id de mongodb
        ref: "usuarios",
        required:true
    },
    nombre:{
        type: String, //tipode dato cadena
        required: true, //requerido
        trim:true
    },
    modelo:{
        type: String, //tipode dato cadena
        required: true, //requerido
        trim:true
    },
    descripcion:{
        type: String, //tipode dato cadena
        required: true, //requerido
        trim:true
    },
    caracteristicas:{
        type: String, //tipode dato cadena
        required: true, //requerido
        trim:true
    },
    precio:{
        type: Number, //tipode dato numerico
        required: true, //requerido
        trim:true
    },
    marca:{
        type: String, //tipode dato cadena
        required: true, //requerido
        trim:true
    },
    stock:{
        type: Number, //tipode dato cadena
        required: true, //requerido
        trim:true
    },
    color:{
        type: String, //tipode dato cadena
        required: true, //requerido
        trim:true
    },
    // fecha:{
    //     type: Date,
    //     default: Date.now
    // }
},{
    timestamps:true //guarda la fecha en la que se creo el producto
});
//con el modelo establecido comienza a interactuar con la base
export default mongoose.model("productos", productSchema);