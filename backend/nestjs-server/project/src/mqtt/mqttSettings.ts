export const CLOUDMQTTOPTIONS = {
  port: 12295,
  host: 'mqtt://m20.cloudmqtt.com',
  clientId:
    'mqttjs_' +
    Math.random()
      .toString(16)
      .substr(2, 8),
  username: 'vqdhgxdd',
  password: '0zyRZ9ySe5Cn',
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clean: true,
  encoding: 'utf8',
};

export const MQTTURL = 'mqtt://m20.cloudmqtt.com';
