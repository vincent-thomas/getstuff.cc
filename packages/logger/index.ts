import winston from "winston";

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.prettyPrint({ colorize: false }),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});
