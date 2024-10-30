// packages/shared-utils/src/config/rabbitmqConfig.ts

export interface RabbitMQConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
}

export const rabbitmqConfig: RabbitMQConfig = {
  host: process.env.RABBITMQ_HOST || "localhost",
  port: Number(process.env.RABBITMQ_PORT) || 5672,
  username: process.env.RABBITMQ_USER || "guest",
  password: process.env.RABBITMQ_PASSWORD || "guest",
  vhost: process.env.RABBITMQ_VHOST || "/",
};
