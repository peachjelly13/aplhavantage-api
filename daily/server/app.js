import express from "express";
import {PORT } from "./constant.js";


const app = express();

app.listen(PORT,()=>{
    console.log(`Listening on PORT, ${PORT}`)
})

export default app;