import * as amqp from 'amqplib';

class RabbitMQService {
    private connection!: amqp.Connection;
    private channel!: amqp.Channel;

    constructor(private amqpUrl: string) {}

    async connect() {
        this.connection = await amqp.connect(this.amqpUrl);
        this.channel = await this.connection.createChannel();
    }

    async sendMessage(queueName: string, messageObject: any) {
        const message = JSON.stringify(messageObject); // JSON formatına dönüştür
        this.channel.assertQueue(queueName, { durable: false });
        this.channel.sendToQueue(queueName, Buffer.from(message));
    }

    async consumeMessage(queueName: string, callback: (message: string) => void) {
        this.channel.assertQueue(queueName, { durable: false });
        this.channel.consume(queueName, (msg) => {
            if (msg) {
                const message = msg.content.toString();
                callback(message);
                this.channel.ack(msg);
            }
        });
    }

    async close() {
        await this.channel.close();
        await this.connection.close();
    }
}

export default RabbitMQService;