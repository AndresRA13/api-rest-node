
// Modelo de usuario que maneja la interacción con la base de datos Firebase
import { db } from "./firebase.js";

import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

// Referencia a la colección de usuarios en Firestore
const usersCollection =  collection(db, "users");

// Crea un nuevo usuario en la base de datos
export const createUser = async (email, passwordHash) =>{
    try {
        // Agrega un nuevo documento a la colección de usuarios
        const docRef = await addDoc(usersCollection, {email, password: passwordHash});
        
        // Retorna el ID del documento creado junto con el email
        return { id: docRef.id, email};
    } catch (error) {
        // Registra cualquier error en la consola
        console.log(error);
    }
}


// Busca un usuario por su email en la base de datos
export const findUserByEmail = async (email) => {
    try {
        // Crea una consulta para buscar usuarios con el email especificado
        const q = query(usersCollection, where("email", "==", email));
        
        // Ejecuta la consulta y obtiene los resultados
        const snapshot = await getDocs(q);
        
        // Si se encontró al menos un usuario, retorna el primero
        if(!snapshot.empty){
            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data()};
        } else {
            // Si no se encontró ningún usuario, retorna null
            return null;
        }
    } catch (error) {
        // Registra cualquier error en la consola
        console.log(error);
    }
}