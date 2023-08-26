import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/auth.routes';
import RabbitMQService from './service/RabbitMQService';
import AuthService from './service/auth.service'

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/CatsgramAuth', {}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.use(express.json());

app.use('/api/users', authRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('express is working');
});

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

// RabbitMQ bağlantısı için kullanılacak URL
const amqpUrl = 'amqp://localhost';

// RabbitMQService'yi başlatın
const rabbitmqService = new RabbitMQService(amqpUrl);

(async () => {
    try {
        // RabbitMQ bağlantısını başlatın
        await rabbitmqService.connect();
        
        console.log('test done');
        

        // Mesajları işleme işlemini başlatın
        rabbitmqService.consumeMessage('token-queue', async (message: any) => {
            // JSON mesajın içeriğini ayrıştır
            const messageData = JSON.parse(message);
        
            // Mesaj türünü belirle (örneğin, messageType alanına göre)
            const messageType = messageData.messageType;
        
            // Mesaj türüne göre işlem yap
            switch (messageType) {
                case 'tip1':
                    // Tip 1 mesajı işle
                   
                    const token = messageData.token;
                    if(token){
                        const username = await AuthService.sendEmailByToken(token);
                        const messageToSend = {
                            messageType: 'tip2',
                            username: username
                        };
                        rabbitmqService.sendMessage('token-queue', JSON.stringify(messageToSend));
                    }
                    break;
                case 'tip2':
                    // Tip 2 mesajı işle
                    console.log('Tip 2 Mesajı:', messageData);
                    break;
                default:
                    console.log('Bilinmeyen Mesaj Türü:', messageType);
            }
        });
    } catch (error) {
        console.error('RabbitMQ veya RabbitMQService başlatılırken hata oluştu:', error);
    }
})();