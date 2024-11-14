import { getLogger, configure } from 'log4js';

const logger = getLogger();

export const MESSAGE_CLIENT_REQUEST = 'Client request';

interface ILogger {
    info: (params: { message: string; endpoint?: string; data?: any }) => void;
    warning: (params: { message: string; detail?: string; endpoint?: string }) => void;
    error: (params: { message: string; detail?: string; stack?: string; endpoint?: string; data?: any }) => void;
}

configure({
    appenders: {
        console: { type: 'console' },
        logstash: {
            type: `${__dirname}/appenders/logstashAppender`,
        },
        slack: { type: `${__dirname}/appenders/slackAppender` },
        _everything: {
            type: 'logLevelFilter',
            appender: 'everything',
            level: 'all',
        },
        _slackError: { type: 'logLevelFilter', appender: 'slack', level: 'all' },
        _logstash: { type: 'logLevelFilter', appender: 'logstash', level: 'error' },
    },
    categories: {
        default: {
            appenders: ['console', '_slackError', '_logstash'],
            level: 'all',
        },
    },
});

class Logger {
    info(message: any) {
        logger.info(message);
    }

    warning(message: any) {
        logger.warn(message);
    }

    error(message: any) {
        logger.error(message);
    }
}

const log: ILogger = new Logger();
export { log as logger };
