import { Queue } from "bullmq";
import {Redis} from "ioredis";

// Configuración de conexión a Redis (debe coincidir con la del Worker)
const connection = new Redis({maxRetriesPerRequest: null});

// Nombre de la cola: 'scraping-task'
const NEWS_QUEUE = new Queue("scraping-task", {connection});

export default NEWS_QUEUE;