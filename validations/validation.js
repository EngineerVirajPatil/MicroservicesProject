function validateFlightByQuery(origin,destination){
    const errors=[];
    if(!origin){
      errors.push("Origin is required");
    }
    if(!destination){
        errors.push("Destination is required");
    }
    return errors;
}

function validateItineraryByQuery(flights, hotels, sites, name){
    const errors=[];
    if(!flights){
      errors.push("Flights are required");
    }
    if(!hotels){
        errors.push("Hotels are required");
    }
    if(!sites){
        errors.push("Sites are required");
    }
    if(!name){
        errors.push("Names are required");
    }
    return errors;
}

module.exports={validateFlightByQuery, validateItineraryByQuery}