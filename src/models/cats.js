// Your models/cats.js should look like this at the end:
const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    markings: DataTypes.STRING,
    lastFed: DataTypes.DATE,
  };

  return sequelize.define("Cat", schema);
};
