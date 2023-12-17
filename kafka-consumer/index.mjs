import { Kafka } from "kafkajs";

const kafkaEndpoint = process.env["KAFKA_ENDPOINT"];
const waitingTime = process.env["WAITING_TIME"];
const topicName = process.env["TOPIC_NAME"];

console.log(`Connecting to kafka broker on ${kafkaEndpoint}`);

const kafka = new Kafka({
  clientId: "kafka-consumer",
  brokers: [process.env["KAFKA_ENDPOINT"]],
});

console.dir(process.env);

const consumer = kafka.consumer({ groupId: "test-group" });

await consumer.connect();
await consumer.subscribe({ topic: topicName });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log(`${new Date().toISOString()} | ${message.value.toString()}`);
    consumer.pause([{ topic: topicName }]);
    await wait(waitingTime);
    consumer.resume([{ topic: topicName }]);
  },
});

function wait(waitingTime) {
  return new Promise((resolve) => setTimeout(resolve, waitingTime));
}
