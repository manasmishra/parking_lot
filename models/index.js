const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Case = require('case');
const basename = path.basename(module.filename);
const { dbConfig } = require('../configs');
const db = {};
const _ = require('lodash');


const sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: {
    max: dbConfig.connectionLimit,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Databse connection is succesful');
  })
  .catch((err) => {
    console.log('Databse connection failed');
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[Case.pascal(model.name)] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Articles.sync();
db.Authors.sync();
db.Categories.sync();
db.Tags.sync();

// module.exports = db;
module.exports = _.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);