import mongoose from "mongoose";

const noticiasSchema = new mongoose.Schema({
    titulo:{
        type:String,
        required:true
    },
    imagenUrl:{
        type: String
    },
    // contenido:{
    //     type:String
    // }
});
const Noticia = mongoose.model("Noticia", noticiasSchema);
export default Noticia;