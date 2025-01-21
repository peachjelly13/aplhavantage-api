import axios from 'axios';


const apiClient = axios.create({
    baseURL:"https://www.alphavantage.co/query",
    headers: {
        'Content-Type': 'application/json',
    },   
})
export default apiClient;