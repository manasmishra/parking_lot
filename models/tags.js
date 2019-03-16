const Case = require('case')
  , _ = require('lodash')
  , { marketHelper } = require('../helpers');
const xblog = require('../connections/xblog')
, logUtil = xblog.util();
const BigNumber = require('bignumber.js');
const { market } = require('../constants');

module.exports = function (sequelize, DataTypes) {
  var Tags = sequelize.define(Case.snake('Tags'), {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "Tags",
    paranoid: true,
    underscore: true,
    timestamps: true,
    freezeTableName: true,
  });

  return Tags;
};
