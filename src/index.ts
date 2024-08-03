import express from 'express';
import connectDB from './config/database';
import carRoutes from './routes/car';
import dotnev from 'dotenv'

const app = express();

dotnev.config()
const port = process.env.PORT;

connectDB();

app.use(express.json());

app.use('/api', carRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
