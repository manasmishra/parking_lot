const Case = require('case')
  , _ = require('lodash')
  , { marketHelper } = require('../helpers');
const xblog = require('../connections/xblog')
, logUtil = xblog.util();
const BigNumber = require('bignumber.js');
const { market } = require('../constants');

module.exports = function (sequelize, DataTypes) {
  var Articles = sequelize.define(Case.snake('Articles'), {
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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
  }, {
      tableName: "Articles",
      paranoid: true,
      underscore: true,
      timestamps: true,
      freezeTableName: true,
    });

  return Articles;
};
