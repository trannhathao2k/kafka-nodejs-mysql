const express = require('express');
const bodyParser = require('body-parser');
const { Invoice } = require('./model');
const routes = require('./routes');
// const kafkaConsumer = require('../../index');
const kafkaProducer = require('./invoiceProducer');
const kafkaConsumer = require('./invoiceConsumer');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes); // định nghĩa routes

// Kết nối cơ sở dữ liệu
Invoice.sync();

app.listen(port, () => {
  console.log(`Máy chủ hóa đơn đang chạy ở cổng ${port}`);
});
