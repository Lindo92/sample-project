const dbConfig = require("../db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password,{
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port
});
const db = {};
console.log('PASSWORD: ', dbConfig.password)
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.teachers = require("./Teacher.js")(sequelize, Sequelize);
db.students = require("./Student.js")(sequelize, Sequelize);
db.classes = require("./Class.js")(sequelize, Sequelize);
module.exports = db;