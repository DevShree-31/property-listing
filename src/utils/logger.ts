import winston from 'winston';
import chalk from 'chalk';

const isProduction = process.env.NODE_ENV === 'production';

const formats = {
  production: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),

  development: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      let levelColor;

      switch (level) {
        case 'error':
          levelColor = chalk.red(level.toUpperCase());
          break;
        case 'warn':
          levelColor = chalk.yellow(level.toUpperCase());
          break;
        case 'info':
          levelColor = chalk.blue(level.toUpperCase());
          break;
        case 'debug':
          levelColor = chalk.green(level.toUpperCase());
          break;
        default:
          levelColor = chalk.white(level.toUpperCase());
      }

      return `[${chalk.gray(timestamp)}] ${levelColor}: ${message}`;
    })
  ),
};

export const logger = winston.createLogger({
  level: 'info',
  format: isProduction ? formats.production : formats.development,
  transports: [
    new winston.transports.Console({
      format: isProduction ? formats.production : formats.development,
    }),
  ],
  exitOnError: false,
});
