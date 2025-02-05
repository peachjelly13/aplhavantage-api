import dotenv from "dotenv";
dotenv.config(); // Ensure .env is loaded first
import app from '../server/app.js';
import express from "express";
import axios from 'axios';
import { function_, symbol } from './constant.js';
import { priceTrend,return_max_value } from "./function.js";
import fs from "fs"

app.use(express.static('../public'));

const API_KEY = process.env.api_key;

const apiClient = axios.create({
    baseURL: "https://www.alphavantage.co/query",
    headers: {
        'Content-Type': 'application/json',
    },
});


// (async () => {
//     try {
//         const response = await apiClient.get('', {  
//             params: {
//                 function: function_,
//                 symbol: symbol,
//                 apikey: API_KEY 
//             }
//         });

//         console.log("Data Fetched");
//         console.log(response.data);
//     } catch (error) {
//         console.error("Error fetching stock data:", error.response?.data || error.message);
//     }
// })();


const getStockData = async(function_,symbol,API_KEY)=>{
    //this will get the whole response from the path
    try {
        const response = await apiClient.get('',{
            params:{
                function:function_,
                symbol:symbol,
                apikey:API_KEY
            }
        })
        console.log("Data Fetched")
        return response.data;
    } catch (error) {
        console.log(error)
        
    }
}
// this function we will use to get data 

app.get('/api/daily/trends',async(req,res)=>{
    const DATA = await getStockData(function_,symbol,API_KEY);
    const OBJ = DATA['Time Series (Daily)'];
    const keys = Object.entries(OBJ);
    const formattedData = keys.map(([datestamp,data])=>({
        datestamp:datestamp,
        ...data
    }))
    const Values = formattedData.map((items)=>({
        datestamp:items["datestamp"],
        open:items["1. open"],
        close:items["4. close"]
    }))
    const trends = Values.map((items)=>{
        const trend = priceTrend(items.open,items.close);
        return{
            datestamp:items.datestamp,
            open:items.open,
            close:items.close,
            trend
        }

    })
    let count_upward = 0;
    let count_downward = 0;
    let count_neutral = 0;
    
    const max_trend = Values.map((items)=>{
        const trend = priceTrend(items.open,items.close);
        if(trend==="Bullish Trend (Uptrend)"){
            count_upward++;
        }
        else if(trend==="Bearish Trend (Downtrend)"){
            count_downward++;
        }
        else{
            count_neutral++;
        }
    })
    let max_ = Math.max(count_upward,count_downward,count_neutral);
    const max_value_trend = return_max_value(count_upward,count_downward,count_neutral,max_);
    res.json({
        trends,
        max_value_trend

    })
    
})




