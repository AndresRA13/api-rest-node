
// Modelo de producto que maneja la interacción con la base de datos Firebase
import { db } from "./firebase.js";

import { collection, getDocs, doc, getDoc, addDoc, setDoc, deleteDoc, updateDoc, query, where } from "firebase/firestore";

// Referencia a la colección de productos en Firestore
const productsCollection = collection(db, "products");


// Obtiene todos los productos de la base de datos
export const getAllProducts = async () =>{
    try {
        // Obtiene todos los documentos de la colección de productos
        const snapshot =  await getDocs(productsCollection);
        
        // Mapea los documentos a objetos con sus IDs y datos
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
    } catch (error) {
        // Registra cualquier error en la consola
        console.error(error);
    }
}
 
// Obtiene un producto específico por su ID
export const getProductById = async (id) => {
  try {
    // Crea una referencia al documento del producto con el ID especificado
    const productRef =  doc(productsCollection,id);
    
    // Obtiene el documento de la base de datos
    const snapshot = await getDoc(productRef);
    
    // Retorna el producto si existe, de lo contrario retorna null
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data()} : null;
  
  } catch (error) {
    // Registra cualquier error en la consola
    console.error(error);
  }
};

// Obtiene productos filtrados por categoría
export const getProductsByCategory = async (category) => {
    try {
      // Crea una consulta para buscar productos que contengan la categoría especificada
      const q = query(
        productsCollection,
        where("category", "array-contains", category)
      );
    
      // Ejecuta la consulta y obtiene los resultados
      const snapshot = await getDocs(q);
      
      // Mapea los documentos a objetos con sus IDs y datos
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
      
    } catch (error) {
      // Registra cualquier error en la consola
      console.error(error);
    }
}

// Crea un nuevo producto en la base de datos
export const createProduct = async (data) => {
    try {
      // Agrega un nuevo documento a la colección de productos
      const docRef = await addDoc(productsCollection, data);
      
      // Retorna el ID del documento creado junto con los datos
      return {id: docRef.id, ...data};
    } catch (error) {
      // Registra cualquier error en la consola
      console.error(error);
    }
}


// Actualiza completamente un producto existente
export const updateProduct = async (id, productData) => {
  try {
    // Crea una referencia al documento del producto con el ID especificado
    const productRef = doc(productsCollection, id);
    
    // Obtiene el documento para verificar si existe
    const snapshot = await getDoc(productRef);

    // Si el producto no existe, retorna false
    if(!snapshot.exists()){
      return false;
    }

    // Reemplaza completamente los datos del producto
    await setDoc(productRef, productData);
    
    // Retorna el producto actualizado
    return { id, ...productData};
  } catch (error) {
    // Registra cualquier error en la consola
    console.log(error);
  }
}

// Actualiza parcialmente un producto existente
export const updatePatchProduct = async (id, productData) => {
  try {
    // Crea una referencia al documento del producto con el ID especificado
    const productRef = doc(productsCollection, id);
    
    // Obtiene el documento para verificar si existe
    const snapshot = await getDoc(productRef);

    // Si el producto no existe, retorna false
    if(!snapshot.exists()){
      return false;
    }

    // Actualiza solo los campos proporcionados en productData
    await updateDoc(productRef, productData);

    // Retorna el producto actualizado
    return { id, ...productData};
  } catch (error) {
    // Registra cualquier error en la consola
    console.log(error);
  }
}

// Elimina un producto por su ID
export const deleteProduct = async (id) => {
  try {
    // Crea una referencia al documento del producto con el ID especificado
    const productRef=  doc(productsCollection, id);
    
    // Obtiene el documento para verificar si existe
    const snapshot = await getDoc(productRef);

    // Si el producto no existe, retorna false
    if(!snapshot.exists()){
      return false;
    }

    // Elimina el documento de la base de datos
    await deleteDoc(productRef);
    
    // Retorna true indicando que la eliminación fue exitosa
    return true;

  } catch (error) {
    // Registra cualquier error en la consola
    console.log(error)
  }
}