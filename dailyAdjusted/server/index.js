import dotenv from "dotenv"
dotenv.config()
import {app} from "./app.js"
import express from "express"
import { function_,symbol,datatype,outputsize } from "./constants"

import axios from "axios"
const API_KEY = process.env.api_key
app.use(express.static('../public'))

const apiClient = axios.create({
    baseURL:"https://www.alphavantage.co/query",
    headers:{
        'Content-Type': 'application/json',
    }
})

const fetchStockData = async(function_,symbol,datatype,outputsize,API_KEY)=>{
    try {
        const response = apiClient.get('',{
            params:{
                function:function_,
                symbol:symbol,
                datatype:datatype,
                outputsize:outputsize,
                apiKey:API_KEY
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        
    }
}

