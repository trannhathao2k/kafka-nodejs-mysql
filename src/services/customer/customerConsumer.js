const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const controller = require('./controller');

const client = new kafka.KafkaClient({ kafkaHost: '127.0.0.1:9092'});
const consumer = new Consumer(
  client,
  [{ topic: 'invoice-created' }, { topic: 'customer-created' }],
  { autoCommit: true }
);

console.log('Chạy đến đây rồi');

consumer.on('message', async (message) => {
  try {
    console.log("Gửi được đến đây");
    const payload = JSON.parse(message.value);
    const topic = message.topic;
    console.log(payload);

    // if (topic === 'invoice-created') {
    //   // xử lý payload tạo hóa đơn
    //   const invoice = await Invoice.create(payload);
    //   console.log('Tạo hóa đơn mới:', invoice.toJSON());
    // }

    if (topic === 'invoice-created') {
      // xử lý payload tạo khách hàng
    //   const customer = await Customer.create(payload);
      console.log('Cập nhật trạng thái nước của khách hàng');
      const id = payload.id_kh;
      // console.log(id);
      controller.updateStatusCustomer(id, {trangthainuoc_kh: 0});
    }

  } catch (err) {
    console.log('Có lỗi xảy ra: ', err);
    consumer.close(true);
  }
});

consumer.on('error', function (err) {
  console.log('Lỗi khi nhận dữ liệu:', err);
  consumer.close(true);
});


consumer.on('offsetOutOfRange', (error) => {
  console.error('Offset out of range with Kafka consumer:', error);
});
