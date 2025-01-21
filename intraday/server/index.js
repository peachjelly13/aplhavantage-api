import dotenv from 'dotenv';
dotenv.config();  
import { function_, symbol_, interval } from './constant.js';
import apiClient from './app.js';

const API_KEY = process.env.api_key;
console.log(API_KEY)
const fetchStockData = async (function_, symbol_, interval, API_KEY) => {
  try {
    console.log('API_KEY:', API_KEY);  
    const response = await apiClient('/query', {  
      params: {
        function: function_,
        symbol: symbol_,
        interval: interval,
        apikey: API_KEY,  
      }
    });
    console.log(response.data);  

  } catch (error) {
    console.log('Error returning data', error); 
  }
};

fetchStockData(function_, symbol_, interval, API_KEY);
