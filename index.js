import express from "express";
const app = express();

app.use((req, res, next) => {
    res.json({ "message" : "middleware Funcionando correctamente"});
});

app.get("/", (req, res) => {
    res.json({ 'message': "Bienvenido a mi API REST con NodeJS y Firebase" });
})

import notFound from "./src/middlewares/not-found.js";

app.use(notFound);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 3000")
})