import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAFKA_BROKER],
  ssl: true,
  sasl: {
    mechanism: process.env.KAFKA_MECHANISM,
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD
  }
});

const producer = kafka.producer();

await producer.connect();

export const sendRequestToKafka = async (data) => {
  try {
  await producer.send({
    topic: "Test-Topic",
    messages: [{ value: JSON.stringify(data) }],
  });
  } catch (error) {
    console.log(`Error sending message to kafka: ${error.message}`)
  }
};
