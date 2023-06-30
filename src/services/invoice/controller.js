const { Invoice } = require('./model');
const { sendMessage } = require('./invoiceProducer');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Ho_Chi_Minh');

const getAll = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({ raw: true });
    res.json(invoices);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const invoice = await Invoice.findByPk(id, { raw: true });
    if (invoice) {
      res.json(invoice);
    } else {
      res.status(404).json({ message: 'Không tìm thấy hóa đơn' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const update = async (req, res) => {
  // const { id_hd, id_kh, ngaytao, trangthainuoc_hd } = req.body;
  const id = req.params.id_hd;
  try {
    await Invoice.update({ trangthainuoc_hd: 0 }, {
      where: {id_hd: id}
    });
    const id_kh = await Invoice.findOne({where: {id_hd: id}});
    // const payload = { id: id_kh };
    await sendMessage(id_kh, 'invoice-created');
    // res.json(payload);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const createWithIDCustomer = async (id) => {
  try {
    const id_kh = id;
    const ngaytao = moment();
    await Invoice.create({ id_kh, ngaytao, trangthainuoc_hd: 1 });
    console.log('Thêm hóa đơn khi có khách hàng đợc tạo với ID khách hàng: ', id_kh);
  }
  catch(error) {
    console.error('Lỗi khi thêm mới hóa đơn: ', error);
  }
}

module.exports = {
    getAll,
    getById,
    update,
    createWithIDCustomer
};