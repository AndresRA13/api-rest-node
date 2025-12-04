
// Controlador de autenticación que maneja el registro y login de usuarios
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/User.js";

// Función para registrar un nuevo usuario
export const register = async (req, res) =>{
    // Extraemos el email y contraseña del cuerpo de la solicitud
    const {email, password} = req.body;
    
    // Validamos que se hayan proporcionado ambos campos
    if(!email || !password){
        return res.status(422).json({"error": "email y password son requeridos"});
    }
    
    // Verificamos si el usuario ya existe en la base de datos
    const existingUser = await findUserByEmail(email);
    
    if(existingUser){
        return res.status(409).json({ "message": "El usuario ya existe"});
    }
    
    // Encriptamos la contraseña antes de guardarla
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Creamos el nuevo usuario en la base de datos
    const user = createUser(email, passwordHash);
    
    // Verificamos si el usuario fue creado correctamente
    if(!user){
        return res.sendStatus(503);
    }
    
    // Retornamos el usuario creado con código de estado 201 (creado)
    res.status(201).json({ id: user.id, email: user.email});
}

// Función para iniciar sesión de un usuario existente
export const login = async (req, res) =>{
    // Extraemos el email y contraseña del cuerpo de la solicitud
    const { email, password} =  req.body;
    
    // Validamos que se hayan proporcionado ambos campos
    if(!email || !password){
        return res.status(422).json({ "error": "Credenciales requeridas"})
    }
    
    // Buscamos al usuario en la base de datos por su email
    const user = await findUserByEmail(email);
    
    // Si no se encuentra el usuario, retornamos error de autenticación
    if(!user){
        return res.status(401).json({ "error": "credenciales invalidas"})
    }
    
    // Comparamos la contraseña proporcionada con la almacenada (encriptada)
    const valid = await bcrypt.compare(password, user.password);
    
    // Si la contraseña no es válida, retornamos error de autenticación
    if(!valid){
        return res.status(401).json({ "error": "credenciales invalidas"});
    }
    
    // Generamos un token JWT para la sesión del usuario
    const token = jwt.sign(
        { id: user.id, email:  user.email},
        process.env.JWT_SECRET,
        {
            expiresIn: "1hr",
        }
    );
    
    // Retornamos el token generado al cliente
    return res.json({ token });
}