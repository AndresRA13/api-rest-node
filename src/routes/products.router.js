// Rutas para la gestión de productos
import { Router } from "express";

// Creamos una instancia del enrutador de Express
const router = Router();

// Importamos las funciones controladoras para las operaciones de productos
import { getAllProducts, 
    searchProducts, 
    getProductById, 
    createProduct, 
    deleteProduct, 
    updateProduct, 
    updatePatchProduct, } from "../controllers/products.controller.js";



// Ruta para obtener todos los productos
router.get("/products", getAllProducts);
 
// Ruta para buscar productos por nombre
router.get("/products/search", searchProducts);

// Ruta para obtener un producto específico por su ID
router.get("/products/:id", getProductById);

// Ruta para crear un nuevo producto
router.post("/products", createProduct);

// Ruta para actualizar completamente un producto existente
router.put("/products/:id", updateProduct);

// Ruta para actualizar parcialmente un producto existente
router.patch("/products/:id", updatePatchProduct);

// Ruta para eliminar un producto por su ID
router.delete("/products/:id", deleteProduct );

// Exportamos el enrutador para usarlo en la aplicación principal
export default router;