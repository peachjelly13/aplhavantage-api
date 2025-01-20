import axios from 'axios';
import dotenv from 'dotenv';
import { function_,symbol_,interval} from './constant.js';
dotenv.config()

const API_KEY = process.env.api_key;
const url = `https://www.alphavantage.co/query?function=${function_}&symbol=${symbol_}&interval=${interval}&apikey=${API_KEY}`;

