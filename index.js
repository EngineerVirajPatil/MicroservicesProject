const axiosInstance = require("./lib/axios.js"); 
require("dotenv").config(); 

axiosInstance
  .get("/health")
  .then((response) => console.log(response.data)) 
  .catch((error) => console.error("Error in fetching the axios health:", error));
