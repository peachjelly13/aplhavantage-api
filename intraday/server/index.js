import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();  
import { function_, symbol_, interval } from './constant.js';
import apiClient from './app.js';
import express from "express";
const app = express();
app.use(express.static('../public'));

const API_KEY = process.env.api_key;
const fetchStockData = async (function_, symbol_, interval, API_KEY) => {
  try {
    const response = await apiClient.get('', {  
      params: {
        function: function_,
        symbol: symbol_,
        interval: interval,
        apikey: API_KEY,  
      }
    });
    console.log("Data received",response.data);
    return response.data;
   
  } catch (error) {
    console.log('Error returning data', error); 
  }
};

app.get('/api/intrdayGraph',async(_,res)=>{
    try {
        const OBJ = await fetchStockData(function_, symbol_, interval, API_KEY);
        const keys = OBJ["Time Series (5min)"]
        fs.writeFileSync('keys.json',JSON.stringify(keys))
        if(keys){
        const entities = Object.entries(keys);
        const formattedData = entities.map(([timestamp,data])=>({
             timestamp:timestamp,
             ...data
        }))
        
        const Values = formattedData.map((items)=>({
            timeStamp:items["timestamp"],
            highValue:items["2. high"],
            lowValue:items["3. low"]
        }))
        const timeArray = Values.map(item=>item.timeStamp);
        const highValue = Values.map(item=>item.highValue);
        const lowValue = Values.map(item=>item.lowValue);
        console.log(Values)
        fs.writeFileSync('highValue.json',JSON.stringify(highValue))
        res.status(200).json({
            timeArray,
            highValue,
            lowValue
        })
        fs.writeFileSync('output.json',JSON.stringify(formattedData))
        fs.writeFileSync('outputValues.json',JSON.stringify(Values))
        }
        else{
            res.status(400).json({message:"No data found"})
        }
        } catch (error) {
        console.log("Error occurred",error)
        
        }
});


app.listen(8000,()=>{
    console.log(`Server is running at port ${8000}`)
})