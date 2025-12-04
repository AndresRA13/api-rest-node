// Punto de entrada principal de la aplicación API REST
import "dotenv/config"
import express from "express";

// Importamos el middleware para verificar tokens JWT
import { verifyToken } from "./src/middlewares/verify-token.js";   

// Creamos una instancia de la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta raíz que muestra un mensaje de bienvenida
app.get("/", (req, res) => {
    res.json({ 'message': "Bienvenido a mi API REST con NodeJS y Firebase" });
});


// Importamos el enrutador de autenticación
import authRouter from "./src/routes/auth.router.js";

// Usamos el enrutador de autenticación bajo el prefijo "/api/auth"
app.use("/api/auth", authRouter);

// Importamos el enrutador de productos
import productRouter from "./src/routes/products.router.js"

// Importamos el middleware para manejar rutas no encontradas
import notFound from "./src/middlewares/not-found.js";

// Usamos el enrutador de productos bajo el prefijo "/api" con verificación de token
app.use("/api", productRouter);

// Middleware para manejar rutas no encontradas (debe ser el último)
app.use(notFound);

// Obtenemos el puerto del entorno o usamos 3001 por defecto
const PORT = process.env.PORT || 3001;

// Iniciamos el servidor y escuchamos en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});

