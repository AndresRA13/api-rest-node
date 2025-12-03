import "dotenv/config"
import express from "express";
import { verifyToken } from "./src/middlewares/verify-token.js";   

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ 'message': "Bienvenido a mi API REST con NodeJS y Firebase" });
});


import authRouter from "./src/routes/auth.router.js";

app.use("/api/auth", authRouter);

import productRouter from "./src/routes/products.router.js"

import notFound from "./src/middlewares/not-found.js";
app.use("/api", verifyToken, productRouter);
app.use(notFound);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 3000")
});

