const Case = require('case');

module.exports = function (sequelize, DataTypes) {
  var Categories = sequelize.define(Case.snake('Categories'), {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    } ,
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      tableName: "Categories",
      paranoid: true,
      underscore: true,
      timestamps: true,
      freezeTableName: true,
    });

  return Categories;
};
