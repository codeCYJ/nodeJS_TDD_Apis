const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false // console.log
});

const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    unique: true // unique를 보장해준다.
  }
  // name: Sequelize.STRING // varchar 255 길이로 생성됨.
});

module.exports = { Sequelize, sequelize, User };

