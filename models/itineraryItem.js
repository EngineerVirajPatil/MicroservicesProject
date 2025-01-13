module.exports=(sequelize, DatatTypes)=>{
    const itineraryItem=sequelize.define("itineraryItem",
        {
            itineraryId:{
              type:DatatTypes.INTEGER,
              allowNull: false
            },
            itemId:{
                type:DatatTypes.INTEGER,
            },
            type:{
                type: DatatTypes.STRING,
            },
        },
        {
            timestamps: true,
        }
    )


    itineraryItem.associate=(models)=>{
        itineraryItem.belongsTo(models.itinerary,
            {
                foreignKey:"itineraryId",
            });
    }

    return itineraryItem;
}