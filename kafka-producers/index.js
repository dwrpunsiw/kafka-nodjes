const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "kafka-producers",
  brokers: ["127.0.0.1:9092"],
});

const producer = kafka.producer();

const runApplication = async () => {
  // Connect to kafka
  await producer.connect();
  // Send message to kafka topic
  await producer.send({
    topic: "nodejs_topic",
    messages: [
      { value: JSON.stringify({ firstName: "Tom", lastName: "Fletcher" }) },
      { value: JSON.stringify({ firstName: "Dougie", lastName: "Poynter" }) },
      { value: JSON.stringify({ firstName: "Danny", lastName: "Jones" }) },
      { value: JSON.stringify({ firstName: "Harry", lastName: "Judd" }) },
    ],
  });
};

runApplication().catch(console.error);
