import mongoose from "mongoose";

const noticiasSchema = new mongoose.Schema({
    titulo:{
        type:String,
        required:true
    },
    imagenUrl:{
        type: String
    },
    enlace:{
        type:String,
        required: true,
        unique: true
    }
});
const Noticia = mongoose.model("Noticia", noticiasSchema);
export default Noticia;