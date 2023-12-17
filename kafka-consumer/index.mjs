import { Kafka } from "kafkajs";

const kafkaEndpoint = process.env["KAFKA_ENDPOINT"];
const waitingTime = process.env["WAITING_TIME"];

console.log(`Connecting to kafka broker on ${kafkaEndpoint}`);

const kafka = new Kafka({
  clientId: "kafka-consumer",
  brokers: [process.env["KAFKA_ENDPOINT"]],
});

console.dir(process.env);

const consumer = kafka.consumer({ groupId: "test-group" });

await consumer.connect();
await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    });
    await wait(waitingTime);
  },
});

function wait(waitingTime) {
  return new Promise((resolve) => setTimeout(resolve, waitingTime));
}
