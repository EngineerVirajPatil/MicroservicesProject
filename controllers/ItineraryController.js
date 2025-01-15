const axiosInstance = require("../lib/axios.js");
require("dotenv").config();

/* axiosInstance
    .get("/health")
    .then((response) => console.log(response.data))
    .catch((error) => console.error("Error in fetching the axios health:", error)); */

    const getFlights = async (req, res) => {
        try {
            const test_error=req.query.test_error;
            const rate_limit=req.query.rate_limit;
            const response = await axiosInstance.get(`/flights?test_error=${test_error}&rate_limit=${rate_limit}`, {
                headers: {
                    "Content-Type":"application/json",
                    CLIENT_KEY: process.env.CLIENT_KEY,
                    CLIENT_SECRET: process.env.CLIENT_SECRET,
                },
            });
            res.status(200).json(response.data);
        } catch (error) {
           // console.error("Error in fetching Flights:", error.response ? error.response.data : error.message);

            if(error.response.status===429){
               return res.status(429).json({error:"Rate Limit exceeded. Please try again later."});
            }
            else if(error.response.status===500 && error.response.data.error==='Simulated error for testing purposes.'){
               return res.status(500).json({error:'Simulated error for testing purposes.'});
            }
            res.status(500).json({error:'Failed to fetch flights'});
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
            //console.error("Error in fetching Hotels:", error.response ? error.response.data : error.message);
            if(error.response.status===429){
               return res.status(429).json({error:"Rate Limit exceeded. Please try again later."});
            }
            else if(error.response.status===500 && error.response.data.error==='Simulated error for testing purposes.'){
               return res.status(500).json({error:'Simulated error for testing purposes.'});
            }
            res.status(500).json({error:'Failed to fetch hotels'});

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

            if(error.response.status===429){
                return res.status(429).json({error:"Rate Limit exceeded. Please try again later."});
             }
             else if(error.response.status===500 && error.response.data.error==='Simulated error for testing purposes.'){
                return res.status(500).json({error:'Simulated error for testing purposes.'});
             }
             res.status(500).json({error:'Failed to fetch sites'});

        }
    };

    module.exports={getFlights, getHotels, getSites };
    
