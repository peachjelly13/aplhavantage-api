import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { function_, datatype, symbol } from "./constants.js";
import express from "express";
import axios from "axios";
import fs from "fs";
import { bearishEngulfing, shootingStar, eveningStar } from "./functions/bearish_patterns.js";
import { bullishEngulfing, morningStar, hammer } from "./functions/bullish_reversal_patterns.js";

const API_KEY = process.env.api_key;

app.use(express.static("../public"));
const apiClient = axios.create({
    baseURL: "https://www.alphavantage.co/query",
});

const fetchStockData = async (function_, datatype, symbol, API_KEY) => {
    try {
        const response = await apiClient.get('', {
            params: {
                function: function_,
                datatype: datatype,
                symbol: symbol,
                apikey: API_KEY
            }
        });
        
        return response.data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }
};
fetchStockData(function_, datatype, symbol, API_KEY);
app.get('/api/CandleStickPatterns', async (_, res) => {
    try {
        const stockData = await fetchStockData(function_, datatype, symbol, API_KEY);
    
        if (!stockData || !stockData["Weekly Time Series"]) {
            return res.status(500).json({ error: "Failed to fetch stock data" });
        }
    
        const usefulStockData = stockData["Weekly Time Series"];
        const Values = Object.entries(usefulStockData).map(([timeStamp, data]) => ({
            timeStamp: timeStamp,
            ...data
        }));
    
        const mappedValues = Values.map(items => ({
            timeStamp: items["timeStamp"],
            open: parseFloat(items["1. open"]),
            high: parseFloat(items["2. high"]),
            low: parseFloat(items["3. low"]),
            close: parseFloat(items["4. close"]),
            volume: parseFloat(items["5. volume"])
        }));
    
        const detectedPatterns = [];
    
        for (let i = 1; i < mappedValues.length; i++) {
            const current = mappedValues[i];
            const previous = mappedValues[i - 1];
    
            if (bearishEngulfing(current.open, current.close, previous.open, previous.close)) {
                detectedPatterns.push({ pattern: "Bearish Engulfing", week: current.timeStamp });
            }
    
            if (shootingStar(current.open, current.close, current.high, current.low)) {
                detectedPatterns.push({ pattern: "Shooting Star", week: current.timeStamp });
            }
    
            if (bullishEngulfing(current.open, current.close, previous.open, previous.close)) {
                detectedPatterns.push({ pattern: "Bullish Engulfing", week: current.timeStamp });
            }
    
            if (hammer(current.open, current.close, current.high, current.low)) {
                detectedPatterns.push({ pattern: "Hammer", week: current.timeStamp });
            }
    
            if (i > 1) {
                const twoWeeksAgo = mappedValues[i - 2];
    
                if (morningStar(twoWeeksAgo.open, twoWeeksAgo.close, previous.open, previous.close, current.open, current.close)) {
                    detectedPatterns.push({ pattern: "Morning Star", week: current.timeStamp });
                }
    
                if (eveningStar(twoWeeksAgo.open, twoWeeksAgo.close, previous.open, previous.close, current.open, current.close)) {
                    detectedPatterns.push({ pattern: "Evening Star", week: current.timeStamp });
                }
            }
        }
    
      
    
        res.json({ detectedPatterns });
    } catch (error) {
        return res.status(500).json({
            error:error.message
        })
        
    }
});
