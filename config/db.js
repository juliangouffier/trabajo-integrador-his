// db.js (ahora es tu archivo de configuración)
module.exports = {
  database: 'hisintegrador',
  username: 'sa',
  password: 'juliangouffier',
  host: 'vps-063cf411.vps.ovh.ca',
  port: 3306,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    connectTimeout: 15000,
  }
};
 