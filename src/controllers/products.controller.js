
import * as Model from "../models/product.js";

export const getAllProducts = async (req, res) => {
    const { category} = req.query;

    const products = await Model.getAllProducts();

    if (category){
        const productsFiltered = products.filter(item => item.categories.includes(category));
        return res.json(productsFiltered);
    } 
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

export const deleteProduct = async (req, res) => {
    const { id } = req.params;


    const deleted = await Model.deleteProduct(id);


    if(!deleted){
        return res.status(404).json({ "error": "Producto no encontrado"});
    }

    res.status(204).send();
}
