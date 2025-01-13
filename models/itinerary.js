module.exports=(DataTypes, sequelize)=>{
    const itinerary=sequelize.define("itinerary",
        {
           name: DataTypes.STRING,
        },
        {
            timestamps: true,
        }
    )


itinerary.asscoiate=(models)=>{
    itinerary.hasMany(models.itineraryItem,{
        foreignKey: "itineraryId",
    });
}

    return itinerary;
}