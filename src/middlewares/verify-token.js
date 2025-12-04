// Middleware para verificar el token JWT de autenticación
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // Extraemos el encabezado de autorización de la solicitud
    const authHeader = req.headers.authorization;
    
    // Verificamos que el encabezado exista y tenga el formato correcto
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ "message": "Token no proporcionado"});
    }

    try {
        // Extraemos el token del encabezado (formato: "Bearer <token>")
        const token = authHeader.split(" ")[1];
        
        // Verificamos y decodificamos el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Agregamos la información del usuario decodificada al objeto de solicitud
        req.user = decoded;
        
        // Continuamos con la siguiente función en la cadena de middleware
        next();
    } catch (error) {
        // Si hay un error en la verificación del token, retornamos error de autenticación
        return res.status(401).json({ "message": "Token inválido"});
    }

}