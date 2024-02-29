//importa la libreria de mongodb mongoose
import mongoose from "mongoose";

const connectDB = async () => {
    //intenta conectarte a la url
    try{
        //mongose conectate a la base de datos
        await mongoose.connect("mongodb+srv://davidroni61:laMumkwqF7AaC6k6@Electronicsdb.obijsi8.mongodb.net/Electronicsdb?retryWrites=true&w=majority&appName=Electronicsdb");
        console.log("Database connected");
    }
    catch(error) {
        //sino atrapa el error y muestralo en consola
        console.log(error);
    }
}
export default connectDB;