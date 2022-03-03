module.exports = (sequelize, Sequelize) => {
  const subject = require("../models/subject.model");
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
    mobileNo: {
      type: Sequelize.STRING,
      default: 0,
    },
  });

  return Tutorial;
};
