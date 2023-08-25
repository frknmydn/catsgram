import { AppDataSource } from "./data-source"
import { user } from "./entity/User.entity"
import express, { Request, Response } from 'express';
import profileRoute from './routes/profile.route'

const app = express();
const PORT = 3001;

app.use(express.json());


AppDataSource.initialize().then(async () => {

    console.log("Connected postgres")

}).catch(error => console.log(error));

app.use('/api/profile',profileRoute);


app.get('/',(req:Request,res:Response) =>{
    res.send('express is working');
});
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});


