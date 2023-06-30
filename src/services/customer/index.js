const express = require('express');
const bodyParser = require('body-parser');
const { Customer } = require('./model');
const routes = require('./routes');
// const kafkaProducer = require('../../kafka-producer');
const kafkaProducer = require('./customerProducer');
const kafkaConsumer = require('./customerConsumer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes); // định nghĩa routes

// Kết nối cơ sở dữ liệu
Customer.sync();

app.listen(port, () => {
  console.log(`Máy chủ khách hàng đang chạy ở cổng ${port}`);
});
