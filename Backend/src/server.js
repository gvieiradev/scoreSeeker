import express from 'express';
import "./workers/news.worker.js";
import "./config/database.js";
import scrapeNewsController from "./controllers/news.controller.js";

const app = express();
const PORT = 3000;

app.use(express.json());
//esta linea inicia el servidor y muestra un mensaje de confirmacion
app.listen(PORT,    () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.post('/api/noticias', scrapeNewsController);