import {app} from './app.js'
import dotenv from "dotenv"
import express from "express"
import axios from 'axios';
import { function_, symbol} from './constant.js';
dotenv.config();

app.use(express.static('../public'))
const API_KEY = process.env.api_key;
// this is basically an apiClient which can be used to access the path again and again
const apiClient = axios.create(function_,symbol,API_KEY)({
    baseURL:"https://www.alphavantage.co/query",
    headers:{
       'Content-Type': 'application/json',
    }
})

const getStockData = async(function_,symbol,API_KEY)=>{
    //this will get the whole response from the path
    try {
        const response = await apiClient.get('',{
            params:{
                function:function_,
                symbol:symbol,
                api_key:API_KEY
    
            }
    
        })
        console.log("Data Fetched")
        return response.data;
    } catch (error) {
        console.log(error)
        
    }
}