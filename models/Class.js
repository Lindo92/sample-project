module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("class", {
    
        title:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        weeks: {
            type: Sequelize.INTEGER
        },
        startDate: {
            type: Sequelize.TEXT
        },
        
    });
    return Class;
    };