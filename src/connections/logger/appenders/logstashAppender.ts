import * as dotenv from "dotenv";
dotenv.config();
import dgram from "dgram";
import os from "os";
const client = dgram.createSocket("udp4");

interface ILoggingEvent {
  level: {
    levelStr: string;
  };
  data: IMessage[];
}
interface IMessage {
  message: string;
  stack: string;
  detail: string;
  endpoint: string;
  level: string;
}

interface ILogstashMessage {
  "@timestamp": string;
  "@metadata": { package: string };
  Env: string;
  Message: string;
  Stack: string;
  Detail: string;
  Endpoint: string;
  Host: string;
  Level: string;
}
const { ENV, LOGSTASH_HOST, LOGSTASH_PORT, LOGSTASH_INDEX } = process.env;

function generatePayload(loggingEvent: ILoggingEvent): ILogstashMessage {
  const {
    message,
    stack = null,
    detail = null,
    endpoint = null,
    level = null,
  }: IMessage = loggingEvent.data[0];
  return {
    "@timestamp": new Date().toISOString(),
    "@metadata": {
      package: LOGSTASH_INDEX,
    },
    Env: ENV || "DEV",
    Message: message,
    Stack: stack,
    Detail: detail,
    Endpoint: endpoint,
    Host: os.hostname(),
    Level: loggingEvent.level.levelStr,
  };
}

const send = async (loggingEvent: ILoggingEvent) => {
  try {
    const payload = JSON.stringify(generatePayload(loggingEvent));
    if (LOGSTASH_HOST) sendMessage(payload);
  } catch (e) {
    console.error(e);
  }
};

function sendMessage(messageBody: string) {
  client.send(messageBody, Number(LOGSTASH_PORT), LOGSTASH_HOST);
}

function logstashAppender(layout: any, timezoneOffset: any) {
  return (loggingEvent?: any) => send(loggingEvent);
}

const configure = (config: any, layouts: any) => {
  let layout = layouts.colouredLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return logstashAppender(layout, config.timezoneOffset);
};

export { configure };
