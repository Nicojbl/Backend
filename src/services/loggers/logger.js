import winston from "winston";
import dotenv from "dotenv";
import __dirname from "../../utils.js";
import path from "path";

dotenv.config();

const typeStage = process.env.STAGE_TYPE;

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    verbose: 5,
    debug: 6,
    silly: 7,
  },
  colors: {
    fatal: "cyan",
    error: "red",
    warn: "yellow",
    info: "blue",
    http: "green",
    verbose: "white",
    debug: "cyan",
    silly: "cyan",
  },
};

const devLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevels.colors }),
        winston.format.simple()
      ),
    }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, `./services/loggers/errors.log`),
      level: "info",
    }),
  ],
});

export const addLogger = (req, res, next) => {
  if (typeStage == "development") {
    req.logger = devLogger;
  } else {
    req.logger = prodLogger;
  }
  req.logger.info(
    `${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`
  );
  next();
};
