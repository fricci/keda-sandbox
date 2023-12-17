import { Kafka } from "kafkajs";
import { faker } from "@faker-js/faker";
import * as uuid from "uuid";

const kafkaEndpoint = process.env["KAFKA_ENDPOINT"];
const topicName = process.env["TOPIC_NAME"];
const waitingTime = process.env["WAITING_TIME"];
const nrOfMessageToSend = process.env["NUMBER_OF_MESSAGE"];

console.log(`Connecting to kafka broker on ${kafkaEndpoint}`);
console.log(`Topic name: ${topicName}`);

const kafka = new Kafka({
  clientId: "kafka-producer",
  brokers: [process.env["KAFKA_ENDPOINT"]],
});

const producer = kafka.producer({
  allowAutoTopicCreation: false,
  transactionTimeout: 30000,
});

await producer.connect();

console.log(`Sending ${nrOfMessageToSend} message(s) to kafka`);
let nrOfMessageAlreadySent = 0;
while (nrOfMessageAlreadySent < nrOfMessageToSend) {
  await producer.send({
    topic: topicName,
    messages: [
      {
        key: uuid.v4(),
        value: JSON.stringify({
          messageId: nrOfMessageAlreadySent,
          dateOfMessage: new Date(),
          partnerName: faker.person.fullName(),
          partnerEmail: faker.internet.email(),
        }),
      },
    ],
  });
  console.log(`${nrOfMessageAlreadySent}. message has been sent`);
  nrOfMessageAlreadySent++;
  await wait(waitingTime);
}

function wait(waitingTime) {
  return new Promise((resolve) => setTimeout(resolve, waitingTime));
}
