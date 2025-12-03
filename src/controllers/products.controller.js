
import * as Model from "../models/product.js";

export const getAllProducts = async (req, res) => {
    const { category} = req.query;

    if (category){
        const productsByCategory = await Model.getProductsByCategory(category);
        return res.json(productsByCategory);
        
    } 

    const products = await Model.getAllProducts();

    res.json(products);
}

export const searchProducts = (req, res) =>{
    const { name } = req.query;

    if (!name){
        return res.status(400).json({ "error": "name query param is required"});
    }

    const products = Model.getAllProducts();

    const productsFiltered = products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()) )

    if(productsFiltered.length === 0){
        return res.status(404).json({ "error": "product no found"});
    }
    res.json(productsFiltered);
}

export const getProductById = async (req,res) => {
    const id = req.params.id;

    const product = await Model.getProductById(id);

    if (!product){
        res.status(404).json({ "error": "product no found"});
    } 
    res.json(product);
}

export const createProduct = async (req, res) => {
    const {name, price, category} =  req.body;

    const product = await Model.createProduct({name, price, category});
    res.status(201).json(product);
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {name, price, category} =  req.body;

    if(!name || !price || !category){
        return res.status(422).json({"error": "nombre, precio y categoria son requeridos"});
    }

    const updated = await Model.updateProduct(id, {name, price, category});

    if(!updated){
        return res.status(404).json({ "error": "producto no encontrado"});
    }
    res.json(updated);
}

export const updatePatchProduct = async (req, res) => {
    const { id } = req.params;
    const data = {}

    if(req.body.name !== undefined){data.name = req.body.name;}
    if(req.body.price !== undefined){data.price = req.body.price;}
    if(req.body.category !== undefined){data.category = req.body.category;}

    if(Object.keys(data).length === 0){
        return res.status(422).json({"error": "no se proporcionaron campos para actualizar"});
    }

    const updated = await Model.updatePatchProduct(id, data);

    if(!updated){
        return res.status(404).json({ "error": "producto no encontrado"});
    }
    res.json(updated);
}


export const deleteProduct = async (req, res) => {
    const { id } = req.params;


    const deleted = await Model.deleteProduct(id);


    if(!deleted){
        return res.status(404).json({ "error": "Producto no encontrado"});
    }

    res.status(204).send();
}
