const axiosInstance = require("./lib/axios.js");
require("dotenv").config();

axiosInstance
    .get("/health")
    .then((response) => console.log(response.data))
    .catch((error) => console.error("Error in fetching the axios health:", error));

const getFlights = async (origin, destination) => {
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

getFlights('bengaluru', 'dehradun')
    .then((flights) => console.log("Flights found:", flights))
    .catch((error) => console.log("Error:", error));
