module.exports = (sequelize, Sequelize) => {
const Teacher = sequelize.define("teacher", {

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
    salary: {
        type: Sequelize.FLOAT
    },
    hiredAt: {
        type: Sequelize.DATE
    }
    
});
return Teacher;
};

