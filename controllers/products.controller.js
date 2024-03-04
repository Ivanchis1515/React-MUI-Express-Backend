//importa el productsModel
import productModel from "../models/product.model.js"

//obtener todas las tareas
export const getProducts = async(request, response) => {
    try{
        const products = await productModel.find();

        // Formatear la respuesta para que coincida con la estructura esperada
        const formattedProducts = products.map((product) => {
            const formattedProduct = {};
            // Iterar sobre las claves del objeto de producto y asignarlas al objeto formateado
            Object.keys(product._doc).forEach((key) => {
            // Omitir claves específicas que no deseas incluir en la respuesta
            if (!['__v'].includes(key)) {
                formattedProduct[key] = product[key];
            }
            });
            return formattedProduct;
        });
    
        response.json(formattedProducts);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        response.status(500).json({ error: 'Error interno del servidor' });
    }
};

//obtener las tareas por id
export const getProductsbyId = async(request, response) => {
    //busca el producto por el id de la url
    const product = await productModel.findById(request.params.id);
    //si no encontro el producto
    if(!product){
        //devuelve un mensaje de error
        response.status(404).json({message:"Producto no encontrado"});
    }
    //si si lo encontro entonces devuelvelo
    response.json(product);
};

//crear productos
export const createProduct = async(request, response) => {
    //obten los datos de la solicitud en proceso
    const {nombre, modelo, descripcion, caracteristicas, precio, marca, stock, color} = request.body;
    // console.log(request.user);
    //crea un nuevo ojbeto con el modelo
    const newProduct =  new productModel({
        usuario: request.user.id, //guarda al usuario
        nombre,
        modelo,
        descripcion,
        caracteristicas,
        precio,
        marca,
        stock,
        color,
    })
    //guarda los datos en la base de datos
    const saveProduct = await newProduct.save();
    //retorna al cliente la información
    response.json(saveProduct);
}

//eliminar productos
export const deleteProducts = async(request, response) => {
    //busca el producto consultado por la url
    const product = await productModel.findByIdAndDelete(request.params.id);
    //si no hay producto
    if(!product){
        //devuelve un mensaje de error
        response.status(404).json({message:"Producto no encontrado"});
    }
    //si si lo encontro devuelve el producto eliminado
    // response.json(product);   
    //devuelve un codigo de estado 204 
    return response.sendStatus(204);
}

//actualizar productos
export const updateProducts = async(request, response) => {
    //busca el producto consultado por la url y toma los datos
    const product = await productModel.findByIdAndUpdate(request.params.id, request.body, {
        new:true
    });
    //si no hay producto
    if(!product){
        //devuelve un mensaje de error
        response.status(404).json({message:"Producto no encontrado"});
    }
    //si si lo encontro devuelve el producto eliminado
    response.json(product);   
}