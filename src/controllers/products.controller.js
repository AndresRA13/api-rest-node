
// Controlador de productos que maneja todas las operaciones CRUD
import * as Model from "../models/product.js";

// Obtiene todos los productos, con opción de filtrar por categoría
export const getAllProducts = async (req, res) => {
    // Extraemos el parámetro de categoría de la consulta
    const { category} = req.query;

    // Si se proporciona una categoría, filtramos los productos por esa categoría
    if (category){
        const productsByCategory = await Model.getProductsByCategory(category);
        return res.json(productsByCategory);
        
    } 

    // Si no hay categoría, obtenemos todos los productos
    const products = await Model.getAllProducts();

    res.json(products);
}

// Busca productos por nombre
export const searchProducts = (req, res) =>{
    // Extraemos el parámetro de nombre de la consulta
    const { name } = req.query;

    // Validamos que se haya proporcionado un nombre para buscar
    if (!name){
        return res.status(400).json({ "error": "el parámetro de consulta 'name' es requerido"});
    }

    // Obtenemos todos los productos
    const products = Model.getAllProducts();

    // Filtramos los productos que contienen el nombre buscado (insensible a mayúsculas)
    const productsFiltered = products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()) )

    // Si no se encuentran productos, retornamos error 404
    if(productsFiltered.length === 0){
        return res.status(404).json({ "error": "producto no encontrado"});
    }
    
    // Retornamos los productos encontrados
    res.json(productsFiltered);
}

// Obtiene un producto específico por su ID
export const getProductById = async (req,res) => {
    // Extraemos el ID de los parámetros de la ruta
    const id = req.params.id;

    // Buscamos el producto por su ID
    const product = await Model.getProductById(id);

    // Si no se encuentra el producto, retornamos error 404
    if (!product){
        res.status(404).json({ "error": "producto no encontrado"});
    } 
    
    // Retornamos el producto encontrado
    res.json(product);
}

// Crea un nuevo producto
export const createProduct = async (req, res) => {
    // Extraemos los datos del producto del cuerpo de la solicitud
    const {name, price, category} =  req.body;

    // Creamos el producto en la base de datos
    const product = await Model.createProduct({name, price, category});
    
    // Retornamos el producto creado con código de estado 201 (creado)
    res.status(201).json(product);
}

// Actualiza completamente un producto existente
export const updateProduct = async (req, res) => {
    // Extraemos el ID de los parámetros de la ruta
    const { id } = req.params;
    
    // Extraemos los datos del producto del cuerpo de la solicitud
    const {name, price, category} =  req.body;

    // Validamos que se hayan proporcionado todos los campos requeridos
    if(!name || !price || !category){
        return res.status(422).json({"error": "nombre, precio y categoria son requeridos"});
    }

    // Actualizamos el producto en la base de datos
    const updated = await Model.updateProduct(id, {name, price, category});

    // Si no se encuentra el producto, retornamos error 404
    if(!updated){
        return res.status(404).json({ "error": "producto no encontrado"});
    }
    
    // Retornamos el producto actualizado
    res.json(updated);
}

// Actualiza parcialmente un producto existente
export const updatePatchProduct = async (req, res) => {
    // Extraemos el ID de los parámetros de la ruta
    const { id } = req.params;
    
    // Creamos un objeto para almacenar los datos a actualizar
    const data = {}

    // Solo agregamos al objeto los campos que se proporcionaron en la solicitud
    if(req.body.name !== undefined){data.name = req.body.name;}
    if(req.body.price !== undefined){data.price = req.body.price;}
    if(req.body.category !== undefined){data.category = req.body.category;}

    // Validamos que se hayan proporcionado al menos un campo para actualizar
    if(Object.keys(data).length === 0){
        return res.status(422).json({"error": "no se proporcionaron campos para actualizar"});
    }

    // Actualizamos parcialmente el producto en la base de datos
    const updated = await Model.updatePatchProduct(id, data);

    // Si no se encuentra el producto, retornamos error 404
    if(!updated){
        return res.status(404).json({ "error": "producto no encontrado"});
    }
    
    // Retornamos el producto actualizado
    res.json(updated);
}


// Elimina un producto por su ID
export const deleteProduct = async (req, res) => {
    // Extraemos el ID de los parámetros de la ruta
    const { id } = req.params;

    // Eliminamos el producto de la base de datos
    const deleted = await Model.deleteProduct(id);

    // Si no se encuentra el producto, retornamos error 404
    if(!deleted){
        return res.status(404).json({ "error": "Producto no encontrado"});
    }

    // Retornamos código de estado 204 (sin contenido) indicando éxito
    res.status(204).send();
}
