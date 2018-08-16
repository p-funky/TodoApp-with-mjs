require('dotenv').config();
const Sequelize = require('sequelize');

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    operatorsAliases: Sequelize.Op
  }
};
