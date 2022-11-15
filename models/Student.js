module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
    
        fullName:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        phone: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.TEXT
        },
        
    });
    return Student;
    };