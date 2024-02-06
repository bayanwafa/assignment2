const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/Sequelize');
const Country = require('./Country');

class Currency extends Model {}

Currency.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  currencyCode: {
    type: DataTypes.STRING(3),
    allowNull: false,
  },
  conversionRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // Foreign key referencing the id column in the Country model
  countryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Countries',
      key: 'id',
    },
  },
}, {
  sequelize,
  underscored: false,
  timestamps: true,
  modelName: 'Currency',
})


// Define associations
Currency.belongsTo(Country, { foreignKey: 'countryId' });
Country.hasMany(Currency, { foreignKey: 'countryId' });

module.exports = Currency;
