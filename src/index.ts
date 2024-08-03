import express, { Request, Response } from 'express';
import connectDB from './config/database';
import Car from './models/car';
import dotnev from 'dotenv'

const app = express();

dotnev.config()
const port = process.env.PORT;

app.use(express.json());

connectDB();
app.get('/', (req:Request, res : Response)=>{
    res.json('welcome to the app')
})
app.get('/cars', async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.get('/cars/:id', async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.post('/cars', async (req: Request, res: Response) => {
  try {
    const { make, model, year } = req.body;
    if (!make || !model || !year) {
      return res.status(400).json({ message: 'Invalid data' });
    }
    const newCar = new Car({ make, model, year });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.put('/cars/:id', async (req: Request, res: Response) => {
  try {
    const { make, model, year } = req.body;
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, { make, model, year }, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.delete('/cars/:id', async (req: Request, res: Response) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(deletedCar);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
