import https from 'https';
import os from 'os';
import * as dotenv from 'dotenv';

dotenv.config();

const { ENV, SLACK_WEBHOOK_URL, SLACK_LOGGING } = process.env;
interface ILoggingEvent {
    level: {
        levelStr: string;
    };
    data: IMessage[];
}
interface IMessage {
    message: string;
    detail: string;
    endpoint: string;
    level: string;
    stack?: string;
    data?: any;
}
function generatePayload(loggingEvent: ILoggingEvent) {
    const slackMessage = {
        attachments: [
            {
                color: loggingEvent.level?.levelStr == 'ERROR' ? '#800000' : '#228B22',
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `Message: ${loggingEvent.data[0].message}`,
                        },
                    },
                ],
            },
        ],
    };

    if (loggingEvent.data[0]?.endpoint) {
        slackMessage.attachments[0].blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Endpoint: ${loggingEvent.data[0].endpoint}`,
            },
        });
    }

    if (loggingEvent.data[0]?.detail) {
        slackMessage.attachments[0].blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Detail: ${loggingEvent.data[0].detail}`,
            },
        });
    }

    if (loggingEvent.data[0]?.stack) {
        slackMessage.attachments[0].blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Stack: ${loggingEvent.data[0].stack}`,
            },
        });
    }

    if (loggingEvent.data[0]?.data) {
        slackMessage.attachments[0].blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Data: ${
                    typeof loggingEvent.data[0]?.data == 'object'
                        ? JSON.stringify(loggingEvent.data[0].data)
                        : loggingEvent.data[0].data
                }`,
            },
        });
    }

    slackMessage.attachments[0].blocks.push(
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `ENV: ${ENV || 'DEV'}`,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Machine: ${os.hostname()}`,
            },
        },
    );

    return slackMessage;
}

async function send(loggingEvent: ILoggingEvent) {
    if (!SLACK_WEBHOOK_URL) {
        throw new Error('Please fill in your Webhook URL');
    }

    try {
        if (ENV !== 'dev') {
            const payload = JSON.stringify(generatePayload(loggingEvent));
            await sendSlackMessage(payload);
        }
    } catch (e) {
        throw new Error(
            `SLACK WARNING: There was a error with the slack request when try to send: ${JSON.stringify(
                loggingEvent,
            )} `,
        );
    }
}

function sendSlackMessage(messageBody: string) {
    const options = {
        hostname: 'hooks.slack.com',
        port: 443,
        path: SLACK_WEBHOOK_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const req = https.request(options, (res) => {
        res.on('data', (d) => {});
    });

    req.on('error', (error) => {
        throw error;
    });

    req.write(messageBody);
    req.end();
}

function slackAppender(layout: any, timezoneOffset: any) {
    return (loggingEvent: ILoggingEvent) => {
        if (SLACK_LOGGING == 'true') send(loggingEvent);
    };
}
function configure(config: any, layouts: any, findAppender: any, levels: any) {
    let layout = layouts.colouredLayout;
    if (config.layout) {
        layout = layouts.layout(config.layout.type, config.layout);
    }
    return slackAppender(layout, config.timezoneOffset);
}

export { configure };
