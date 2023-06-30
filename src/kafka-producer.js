const kafka = require('kafka-node');

const Producer = kafka.Producer;
// const kafkaHost = '10.96.37.174:9092';
const client = new kafka.KafkaClient({ kafkaHost: '127.0.0.1:9092'});
const producer = new Producer(client);

producer.on('ready', () => {
  console.log('Kafka producer đang chạy');
});

producer.on('error', (err) => {
  console.log('Lỗi: ' + err);
});

const sendMessage = (payload, topic) => {
  const message = JSON.stringify(payload);
  // const buffer = new Buffer.from(message);
  const record = [
    {
      topic: topic,
      messages: message
    }
  ];

  producer.send(record, (error, result) => {
    console.log("Đã gọi producer.send")
    if (error) {
      console.error(`Lỗi khi gửi dữ liệu đến Kafka topic ${topic}: ${error}`);
    } else {
      console.log(`Payload được gửi đến Kafka topic ${topic}: ${JSON.stringify(payload)}`);
    }
  });

  // producer.close(() => {
  //   console.log('Kafka producer đã đóng');
  // });
};

module.exports = {
  sendMessage
};
