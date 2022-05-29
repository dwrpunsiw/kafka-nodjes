const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "kafka-consumers",
  brokers: ["127.0.0.1:9092"],
});

const consumer = kafka.consumer({ groupId: "nodejs-group" });

const runApplication = async () => {
  // Connect to kafka
  await consumer.connect();
  // Subscribe to specific topic
  await consumer.subscribe({ topic: "nodejs_topic", fromBeginning: true });
  // Consume data indefinitely
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Logging received data
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

runApplication().catch(console.error);
