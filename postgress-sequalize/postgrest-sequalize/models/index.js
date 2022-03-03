const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
//db.comments = require("./comment.model")(sequelize, Sequelize);

//one to One =>hasOne belongsTo

//one to Many => hasMany belongsTo
// db.tutorials.hasMany(db.comments, { as: "comments" });
// db.comments.belongsTo(db.tutorials, {
//   foreginkey: "tutorialId",
//   as: "tutorial",
// });

// //onetoMany
// db.tutorials.hasMany(db.subjects, {
//   foreignKey: "tutorialId",
//   as: "subjects",
// });

// db.subjects.belongsTo(db.tutorials, {
//   foreignKey: "tutorialId", //fk
//   as: "tutorial",
// });

// db.employees = require("./employee.model.js")(sequelize, Sequelize);

module.exports = db;
