import mongoose from "mongoose";

mongoose.connect("mongodb+srv://inggabrielvieira_db_user:ST3pLgqHEnUqZI45@cluster0.qx2geko.mongodb.net/?appName=Cluster0")
    .then(()=>{
        console.log("Database connection successful")
    })
    .catch(err =>{
        console.error("Database connection error")
    })