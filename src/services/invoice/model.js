const Sequelize = require('sequelize');
// const { Customer } = require('../customer/model')
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Ho_Chi_Minh');

const sequelize = new Sequelize('capnuoc_hoadon', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Invoice = sequelize.define('hoadon', {
    id_hd: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    id_kh: { type: Sequelize.INTEGER },
    // references: { model: 'khachhang', key: 'id_kh' }
    //Nếu khai báo model là Customer sẽ bị lỗi
    ngaytao: Sequelize.DATE,
    trangthainuoc_hd: Sequelize.BOOLEAN
  }, { timestamps: false });

module.exports = {
  Invoice
};
