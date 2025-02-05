import {app} from './app.js'
import dotenv from "dotenv"
import express from "express"
import axios from 'axios';
import { function_, symbol} from './constant.js';
dotenv.config();

app.use(express.static('../public'))
const API_KEY = process.env.api_key;

const apiClient = axios.create(function_,symbol,API_KEY)({
    baseURL:"https://www.alphavantage.co/query",
    headers:{
       'Content-Type': 'application/json',
    }
})