import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();  
import { function_, symbol_, interval } from './constant.js';
import apiClient from './app.js';
import { timeStamp } from 'console';

const API_KEY = process.env.api_key;
const fetchStockData = async (function_, symbol_, interval, API_KEY) => {
  try {
    console.log('API_KEY:', API_KEY);  
    const response = await apiClient('', {  
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

(async()=>{
    try {
        const OBJ = await fetchStockData(function_, symbol_, interval, API_KEY);
        const keys = OBJ["Time Series (5min)"]
        
        if(keys){
        const entities = Object.entries(keys);
        const formattedData = entities.map(([timestamp,data])=>({
             timestamp:timestamp,
             ...data
        }))
        const highValues = formattedData.map((items)=>({
            timeStamp:items["timestamp"],
            highValue:items["2. high"]
        }))
        const timeArray = highValues.map(item=>item.timeStamp);
        const highValue = highValues.map(item=>item.highValue);
        console.log(timeArray);
        console.log(highValue);
        if(formattedData){
            fs.writeFileSync('output.json',JSON.stringify(formattedData))
        }
        if(highValues){
            fs.writeFileSync('outputHighValues.json',JSON.stringify(highValues))
        }}
        } catch (error) {
        console.log("Error occurred",error)
        
        }
})();


