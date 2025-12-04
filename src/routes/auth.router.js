// Rutas para la autenticación de usuarios
import { Router } from "express";

// Importamos las funciones controladoras para el registro e inicio de sesión
import { register, login } from "../controllers/auth.controller.js";

// Creamos una instancia del enrutador de Express
const router =  Router();

// Ruta para registrar un nuevo usuario
router.post("/register", register );

// Ruta para iniciar sesión de un usuario existente
router.post("/login", login );

// Exportamos el enrutador para usarlo en la aplicación principal
export default router;
