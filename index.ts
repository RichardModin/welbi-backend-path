import express, { Application } from 'express';
import residentsRouter from './routes/api/residents';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port:string|5000 = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/residents', residentsRouter);

app.listen(port, ():void => {
  console.log(`Server is running on ${port}`);
});