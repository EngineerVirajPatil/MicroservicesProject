require("dotenv").config();
const cors=require("cors");
const express = require('express');
const app=express();
app.use(express.json());
app.use(cors());
const axiosInstance = require("./lib/axios.js");
const {createItinerary, getItinerary }=require("./controllers/dataController.js");
const {getFlights, getHotels, getSites }=require("./controllers/ItineraryController.js");
const { sequelize } = require("./models");

axiosInstance
    .get("/health")
    .then((response) => console.log(response.data))
    .catch((error) => console.error("Error in fetching the axios health:", error));

const getFlightsByDetails = async (origin, destination) => {
    try {
        const response = await axiosInstance.get('/flights/search', {
            params: {
                origin: origin,
                destination: destination,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetching data:", error.response ? error.response.data : error.message);
    }
};

getFlightsByDetails('bengaluru', 'dehradun')
    .then((flights) => console.log("Flights found:", flights))
    .catch((error) => console.log("Error:", error));


app.post("/itinerary",createItinerary);
app.get("/itinerary/:id",getItinerary);

app.get("/data/flights",getFlights);
app.get("/data/hotels",getHotels);
app.get("/data/sites",getSites);

sequelize.authenticate()
.then(()=>{
    console.log("Database got connected");
})
.catch((error)=>{
    console.log("Unable to connect Database ",error)
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})