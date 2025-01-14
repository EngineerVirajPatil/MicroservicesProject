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
const { validateFlightByQuery, validateItineraryByQuery } = require('./validations/validation.js'); 


axiosInstance
    .get("/health")
    .then((response) => console.log(response.data))
    .catch((error) => console.error("Error in fetching the axios health:", error));

const getFlightsByDetails = async (req, res) => {
    const origin=req.query.origin;
    const destination=req.query.destination;
    const errors=validateFlightByQuery(origin,destination);
    if(errors && errors.length>0){
    return res.json({errors: errors});
    }

    try {
        const response = await axiosInstance.get(`/flights/search?origin=${origin}&destination=${destination}`);
        return res.json(response.data);
    } catch (error) {
        console.error("Error in fetching data:", error.response ? error.response.data : error.message);
    }
};

/* getFlightsByDetails('bengaluru','deharadun')
    .then((flights) => console.log("Flights found:", flights))
    .catch((error) => console.log("Error:", error)); */


app.post("/itinerary",createItinerary);
app.get("/itinerary/:id",getItinerary);
app.get("/data/flights",getFlights);
app.get("/data/hotels",getHotels);
app.get("/data/sites",getSites);
app.get("/data/flightDetails",getFlightsByDetails);

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