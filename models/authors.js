const Case = require('case');

module.exports = function (sequelize, DataTypes) {
  var Authors = sequelize.define(Case.snake('Authors'), {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name : {
      type: DataTypes.STRING,
      allowNull: false
    },
    address : {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_id : {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
    contact_home: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: true
      }
    },
    contact_mobile: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: true
      }
    }
  }, {
    tableName: "Authors",
    paranoid: true,
    underscore: true,
    timestamps: true,
    freezeTableName: true,
  });

  return Authors;
};