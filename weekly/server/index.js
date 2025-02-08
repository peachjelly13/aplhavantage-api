import dotenv from "dotenv"
dotenv.config();
import app from "./app.js";
import { function_,datatype,symbol } from "./constants.js";
import express from "express"
import axios from "axios"

const API_KEY = process.env.api_key

app.use(express.static("../public"));
const apiClient = axios.create({
    baseURL:"https://www.alphavantage.co/query",

})

const fetchStockData = async(function_,datatype,symbol)=>{
    const response = apiClient.get('',{
        params:{
            function:function_,
            datatype:datatype,
            symbol:symbol,
            apiKey:API_KEY
        }
    })
}


