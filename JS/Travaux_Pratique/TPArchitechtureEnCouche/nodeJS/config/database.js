const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Gestion2', 'root', 'root', {
    host: 'localhost',
    port :8889,
    dialect: 'mysql',
});
sequelize.sync();
module.exports = sequelize;