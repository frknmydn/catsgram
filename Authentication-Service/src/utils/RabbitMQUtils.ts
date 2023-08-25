import * as amqp from 'amqplib';
import * as winston from 'winston';


class RabbitMQUtils {
    private connection!: amqp.Connection;
    private channel!: amqp.Channel;
    private logger: winston.Logger;

    constructor(private amqpUrl: string) {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            defaultMeta: { service: 'rabbitmq-utils' },
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log' }),
            ],
        });
    }

    async connect() {
        try {
            this.connection = await amqp.connect(this.amqpUrl);
            this.channel = await this.connection.createChannel();
            this.logger.info('RabbitMQ bağlantısı başarıyla oluşturuldu.');
        } catch (error) {
            this.logger.error('RabbitMQ bağlantısı oluşturulurken hata oluştu:', error);
            throw error;
        }
    }

    async sendMessage(queueName: string, message: string) {
        try {
            this.channel.assertQueue(queueName, { durable: false });
            this.channel.sendToQueue(queueName, Buffer.from(message));
            this.logger.info(`Mesaj gönderildi: ${message}`);
        } catch (error) {
            this.logger.error('Mesaj gönderilirken hata oluştu:', error);
            throw error;
        }
    }

    async consumeMessage(queueName: string, callback: (message: string) => void) {
        try {
            this.channel.assertQueue(queueName, { durable: false });
            this.channel.consume(queueName, (msg) => {
                if (msg) {
                    const message = msg.content.toString();
                    callback(message);
                    this.channel.ack(msg);
                    this.logger.info(`Mesaj alındı ve işlendi: ${message}`);
                }
            });
        } catch (error) {
            this.logger.error('Mesaj alınırken hata oluştu:', error);
            throw error;
        }
    }

    async close() {
        try {
            await this.channel.close();
            await this.connection.close();
            this.logger.info('RabbitMQ bağlantısı kapatıldı.');
        } catch (error) {
            this.logger.error('RabbitMQ bağlantısı kapatılırken hata oluştu:', error);
            throw error;
        }
    }
}

export default RabbitMQUtils;