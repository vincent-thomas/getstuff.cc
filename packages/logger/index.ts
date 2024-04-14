import winston from "winston";

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.prettyPrint({ colorize: false }),
  transports: [
    env.NODE_ENV !== "production"
      ? new winston.transports.File({
          dirname: "logs",
          filename: "all.log",
        })
      : new winston.transports.Console({
          format: winston.format.simple(),
          level: "error",
        }),
  ],
});
