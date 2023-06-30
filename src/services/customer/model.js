const Sequelize = require('sequelize');

const sequelize = new Sequelize('capnuoc_khachhang', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Customer = sequelize.define('khachhang', {
  id_kh: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  hoten: Sequelize.STRING,
  gioitinh: Sequelize.BOOLEAN,
  tuoi: Sequelize.INTEGER,
  diachi: Sequelize.STRING,
  trangthainuoc_kh: Sequelize.BOOLEAN
}, { timestamps: false });

module.exports = {
  Customer
};
