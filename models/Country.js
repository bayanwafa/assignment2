const { DataTypes } = require('sequelize');
const sequelize = require('../config/Sequelize');

const Country = sequelize.define('Country', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


Country.associate = (models) => {
  Country.hasMany(models.Currency, { foreignKey: 'countryId' });
};


module.exports = Country;
