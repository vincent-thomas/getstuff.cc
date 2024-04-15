import {Kafka, logLevel} from "kafkajs";

export const getKafka = () => new Kafka({
  brokers: [env.KAFKA_BROKER],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: env.KAFKA_USERNAME,
    password: env.KAFKA_PASSWORD
  },
  logLevel: logLevel.ERROR
})