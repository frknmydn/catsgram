import { AppDataSource } from "./data-source"
import { users } from "./entity/User.entity"
import express, { Request, Response } from 'express';
import profileRoute from './routes/profile.route'
import reportRoute from './routes/report.route'
import petsRouter from './routes/pets.route'
import followRouter from './routes/follow.route'
import blockRouter from './routes/block.route'

const app = express();
const PORT = 3001;

app.use(express.json());


AppDataSource.initialize().then(async () => {

    console.log("Connected postgres")

}).catch(error => console.log(error));

app.use('/api/profile',profileRoute);
app.use("/api/reports",reportRoute)
app.use("/api/pets", petsRouter);
app.use("/api/follow", followRouter);
app.use("/api/block", blockRouter);

app.get('/',(req:Request,res:Response) =>{
    res.send('express is working');
});
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});


