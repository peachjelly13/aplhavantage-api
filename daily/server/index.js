import dotenv from "dotenv";
dotenv.config(); // Ensure .env is loaded first

import app from '../server/app.js';
import express from "express";
import axios from 'axios';
import { function_, symbol } from './constant.js';

app.use(express.static('../public'));

const API_KEY = process.env.api_key;

const apiClient = axios.create({
    baseURL: "https://www.alphavantage.co/query",
    headers: {
        'Content-Type': 'application/json',
    },
});


(async () => {
    try {
        const response = await apiClient.get('', {  
            params: {
                function: function_,
                symbol: symbol,
                apikey: API_KEY 
            }
        });

        console.log("Data Fetched");
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching stock data:", error.response?.data || error.message);
    }
})();


// const getStockData = async(function_,symbol,API_KEY)=>{
//     //this will get the whole response from the path
//     try {
//         const response = await apiClient.get('',{
//             params:{
//                 function:function_,
//                 symbol:symbol,
//                 api_key:API_KEY
    
//             }
    
//         })
//         console.log("Data Fetched")
//         return response.data;
//     } catch (error) {
//         console.log(error)
        
//     }
// }


