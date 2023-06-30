const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const { Customer, Invoice } = require('services');
// const express = require('express');

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

    if (topic === 'invoice-created') {
      // xử lý payload tạo hóa đơn
      const invoice = await Invoice.create(payload);
      console.log('Tạo hóa đơn mới:', invoice.toJSON());
    }

    if (topic === 'customer-created') {
      // xử lý payload tạo khách hàng
      const customer = await Customer.create(payload);
      console.log('Tạo khách hàng mới:', customer.toJSON());
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


// const { sendMessage } = require('./src/kafka-producer');
// const app = require('./src/index');
// const app = express();

//  router.post('/invoice', async (req, res) => {
//    const { customerId, amount, date } = req.body;
//    const payload = { customerId, amount, date };
//    await sendMessage(payload, 'invoice-created');
//    res.json(payload);
//  });

//  router.post('/customer', async (req, res) => {
//    const { name, email, phone } = req.body;
//    const payload = { name, email, phone };
//    await sendMessage(payload, 'customer-created');
//    res.json(payload);
//  });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use('/api', routes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
