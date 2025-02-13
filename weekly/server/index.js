import dotenv from "dotenv"
dotenv.config();
import app from "./app.js";
import { function_,datatype,symbol } from "./constants.js";
import express from "express"
import axios from "axios"
import { fontString } from "chart.js/helpers";
import fs from "fs"
import { timeStamp } from "console";

const API_KEY = process.env.api_key

app.use(express.static("../public"));
const apiClient = axios.create({
    baseURL:"https://www.alphavantage.co/query",

})

const fetchStockData = async(function_,datatype,symbol,API_KEY)=>{
    try {
        const response = await apiClient.get('',{
            params:{
                function:function_,
                datatype:datatype,
                symbol:symbol,
                apikey:API_KEY
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        
    }
}


app.get('/api/CandleStickPatterns',async(__,res)=>{
    const stockData = await fetchStockData(function_,datatype,symbol,API_KEY);
    const usefulStockData = stockData["Weekly Time Series"];
    const Values = Object.entries(usefulStockData).map(([timeStamp,data])=>({
        timeStamp:timeStamp,
        ...data
    }))
    const mappedValues = Values.map((items)=>({
        timeStamp:items["timeStamp"],
        open:items["1. open"],
        high:items["2. high"],
        low:items["3. low"],
        close:items["4. close"],
        volume:items["5. volume"]
    }))
    const timeStampArray = mappedValues.map(item=>item.timeStamp);
    const openArray = mappedValues.map(item=>item.open);
    const highArray = mappedValues.map(item=>item.high);
    const lowArray = mappedValues.map(item=>item.low);
    const closeArray = mappedValues.map(item=>item.close)
    const volumeArray = mappedValues.map(item=>item.volume);

    fs.writeFileSync("output.json",JSON.stringify(openArray))
    
})

