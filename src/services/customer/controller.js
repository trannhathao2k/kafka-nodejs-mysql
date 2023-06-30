const { Customer } = require('./model');
const { sendMessage } = require('./customerProducer');

const getAll = async (req, res) => {
  try {
    const customers = await Customer.findAll({ raw: true });
    res.json(customers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const customer = await Customer.findByPk(id, { raw: true });
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Không tìm thấy khách hàng' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const create = async (req, res) => {
  const { id_kh, hoten, gioitinh, tuoi, diachi, trangthainuoc_kh } = req.body;
  try {
    const customer = await Customer.create({ id_kh, hoten, gioitinh, tuoi, diachi, trangthainuoc_kh });
    const payload = { id: customer.id_kh, hoten, gioitinh, tuoi, diachi, trangthainuoc_kh };
    console.log(payload);
    await sendMessage(payload, 'customer-created');
    res.json(payload);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const updateStatusCustomer = async (id, newData) => {
  try {
    const result = await Customer.update(newData, {
      where: {id_kh: id}
    });

    console.log(result); //check xem có những dòng nào bị cập nhật

    if (result[0] === 1) {
      console.log('Dòng đã được cập nhật thành công');
    } else {
      console.log('Không tìm thấy dòng để cập nhật');
    }
  }
  catch(error) {
    console.error('Lỗi khi cập nhật trạng thái nước của khách hàng: ', error);
  }
}

module.exports = {
    getAll,
    getById,
    create,
    updateStatusCustomer
};