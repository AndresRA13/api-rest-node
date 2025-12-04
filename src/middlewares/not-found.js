// Middleware para manejar rutas no encontradas
export default ((req, res, next) =>{
    // Retorna un error 404 con un mensaje claro cuando la ruta no existe
    res.status(404).json({ "error": "ruta no encontrada"});
});