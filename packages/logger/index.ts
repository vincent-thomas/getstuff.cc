import winston from "winston";

export const logger = winston.createLogger({
	level: "debug",
	format: winston.format.prettyPrint({ colorize: false }),
	transports: [
		new winston.transports.File({
			dirname: "logs",
			filename: "all.log",
		}),
	],
});

if (env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple(),
			level: "error",
		}),
	);
}
