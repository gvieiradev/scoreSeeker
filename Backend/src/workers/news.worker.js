import Noticia from "../models/noticias.models.js"
import {Worker} from "bullmq";
import {Redis} from "ioredis";
import {chromium} from 'playwright';

//configuracion de conexion a redis
const connection = new Redis({maxRetriesPerRequest: null});

//definicion del worker: escucha la cola "scraping-task"
const newsWorker = new Worker("scraping-task", async job =>{
    const browser = await chromium.launch();// lanza el navegador basado en chromiun
    const page = await browser.newPage();// abre una pestaña o ventana del navegador

    try {
        await page.goto(job.data.targetUrl);// navega a la url indicada
        await page.waitForSelector("div.col-md-4.col-sm-6.col-xs-12", {timeout:1000});//selecciona los elementos CSS de la noticia con una espera de 1000milisegundos

        const articleList = await page.$$eval("div.col-md-4.col-sm-6.col-xs-12 article.s.s--v", elements => elements.map(el => {

            //extraccion de imagen
            const imgEl = el.querySelector("img.mm__img");
            const imgUrl = imgEl ? imgEl.getAttribute("src"):null;

            //extraccion del texto
            const linkEl = el.querySelector("h2.s__tl a");;
            const textClear = linkEl ? linkEl.innerText.trim():null;
            const linkUrl = linkEl ? linkEl.getAttribute("href"):null;

            return{
                imagen : imgUrl,
                titulo : textClear,
                enlace : linkUrl,
            };

        }));
        console.log(`intentando guardar ${articleList.length} articulos `)

       for(const item of articleList){
            const nuevoRegistro = new Noticia({
                titulo:item.titulo,
                imagenUrl:item.imagen,
                enlace: item.enlace
            });

            await nuevoRegistro.save();
        }

        console.log(`se ha guardado exitosamente ${articleList.length} noticias`);

    }catch(error){
        console.error('Error durante el Web Scraping:', error);
    }finally{
        await browser.close();
    }

}, {connection})