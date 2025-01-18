const axios = require("axios");
require("dotenv").config();

console.log("Client Key:", process.env.CLIENT_KEY); 
console.log("Client Secret:", process.env.CLIENT_SECRET); 

const axiosInstance = axios.create({
    baseURL: process.env.MICROSERVICES_BASE_URL,
    headers: {
        "Content-Type":"application/json",
        CLIENT_KEY: process.env.CLIENT_KEY,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
    },
});

module.exports = axiosInstance;
