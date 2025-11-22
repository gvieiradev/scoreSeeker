import NEWS_QUEUE from "../queues/news.queue.js";
import axios from "axios";

const scrapeNewsController = async(req , res) =>{
    const {url} = req.body;

        try{
            //verifica si la url es accesible
            const response = await axios.get(url, {timeout:500});

            const job = await NEWS_QUEUE.add("scrape-url-job",{targetUrl:url})
            res.status(202).json({
                mesage: "Tarea de Scrapping encolada exitosamente",
                jobId: job.id,
                status: "accepted"
            });
        } catch (error) {
            console.error("Error al verificar la URL: ", error.message);
            res.status(400).json({
                message:"La URL proporcionada no es valida o no esta accesible.",
                status:"failed validation"
            })
        }
}

export default scrapeNewsController;