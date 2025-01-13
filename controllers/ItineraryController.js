const axiosInstance = require("../lib/axios.js");
require("dotenv").config();

axiosInstance
    .get("/health")
    .then((response) => console.log(response.data))
    .catch((error) => console.error("Error in fetching the axios health:", error));

    const getFlights = async (req, res) => {
        try {
            const response = await axiosInstance.get('/flights', {
                headers: {
                    "Content-Type":"application/json",
                    CLIENT_KEY: process.env.CLIENT_KEY,
                    CLIENT_SECRET: process.env.CLIENT_SECRET,
                },
            });
            res.status(200).json(response.data);
        } catch (error) {
            console.error("Error in fetching Flights:", error.response ? error.response.data : error.message);
        }
    };


    const getHotels = async (req, res) => {
        try {
            const response = await axiosInstance.get('/hotels', {
                headers: {
                    "Content-Type":"application/json",
                    CLIENT_KEY: process.env.CLIENT_KEY,
                    CLIENT_SECRET: process.env.CLIENT_SECRET,
                },
            });
            res.status(200).json(response.data);
        } catch (error) {
            console.error("Error in fetching Hotels:", error.response ? error.response.data : error.message);
        }
    };

    const getSites = async (req, res) => {
        try {
            const response = await axiosInstance.get('/sites', {
                headers: {
                    "Content-Type":"application/json",
                    CLIENT_KEY: process.env.CLIENT_KEY,
                    CLIENT_SECRET: process.env.CLIENT_SECRET,
                },
            });
            res.status(200).json(response.data);
        } catch (error) {
            console.error("Error in fetching Sites:", error.response ? error.response.data : error.message);
        }
    };

    module.exports={getFlights, getHotels, getSites };
    
