const { flight: flightModel, hotel: hotelModel, itinerary: itineraryModel, itineraryItem: itineraryItemModel, site: siteModel } = require("../models");

const createItinerary = async (req, res) => {
    const { flights, hotels, sites, name } = req.body;
    try {
        if (name && name.trim().length > 0) {
            // Create the itinerary
            const newItinerary = await itineraryModel.create({ name });

            // Add flights to the itinerary
            if (flights && flights.length > 0) {
                for (const flight of flights) {
                    const savedFlight = await flightModel.create(flight);
                    await itineraryItemModel.create({
                        itineraryId: newItinerary.id,
                        itemId: savedFlight.id,
                        type: "flight",
                    });
                }
            }

            // Add hotels to the itinerary
            if (hotels && hotels.length > 0) {
                for (const hotel of hotels) {
                    const savedHotel = await hotelModel.create(hotel);
                    await itineraryItemModel.create({
                        itineraryId: newItinerary.id,
                        itemId: savedHotel.id,
                        type: "hotel",
                    });
                }
            }

            // Add sites to the itinerary
            if (sites && sites.length > 0) {
                for (const site of sites) {
                    const savedSite = await siteModel.create(site);
                    await itineraryItemModel.create({
                        itineraryId: newItinerary.id,
                        itemId: savedSite.id,
                        type: "site",
                    });
                }
            }

            res.status(201).json({ message: "Itinerary created", itinerary: newItinerary });
        } else {
            res.status(400).json({ error: "Name is required to create an itinerary." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create Itinerary" });
    }
};

const getItinerary = async (req, res) => {
    try {
        const newItinerary = await itineraryModel.findByPk(req.params.id);
        if (!newItinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        const allFlights = [];
        const allHotels = [];
        const allSites = [];

        const itineraryItems = await itineraryItemModel.findAll({ where: { itineraryId: newItinerary.id } });

        for (const item of itineraryItems) {
            if (item.type === "flight") {
                const flight = await flightModel.findByPk(item.itemId);
                if (flight) allFlights.push(flight);
            }
            if (item.type === "hotel") {
                const hotel = await hotelModel.findByPk(item.itemId);
                if (hotel) allHotels.push(hotel);
            }
            if (item.type === "site") {
                const site = await siteModel.findByPk(item.itemId);
                if (site) allSites.push(site);
            }
        }

        res.status(200).json({ itinerary: newItinerary, flights: allFlights, hotels: allHotels, sites: allSites });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in fetching Itinerary" });
    }
};

module.exports = { createItinerary, getItinerary };
