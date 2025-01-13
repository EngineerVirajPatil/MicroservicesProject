const axios = require("axios");
require("dotenv").config();

console.log("Client Key:", process.env.CLIENT_KEY); // Debugging log
console.log("Client Secret:", process.env.CLIENT_SECRET); // Debugging log

const axiosInstance = axios.create({
    baseURL: "https://trip-planner-invact.vercel.app/api/v1/",
    headers: {
        CLIENT_KEY: process.env.CLIENT_KEY,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
    },
});

module.exports = axiosInstance;
