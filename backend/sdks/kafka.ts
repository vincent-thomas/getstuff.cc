import { Kafka, logLevel } from "kafkajs";

export const getKafka = (broker: string, username: string, password: string) =>
  new Kafka({
    brokers: [broker],
    ssl: true,
    sasl: {
      mechanism: "scram-sha-256",
      username,
      password,
    },
    logLevel: logLevel.ERROR,
  });
