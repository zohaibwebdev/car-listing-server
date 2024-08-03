import express, { Request, Response } from 'express';
import Car, { CarSchema } from '../models/car';
import { z } from 'zod';

const router = express.Router();

router.get('/cars', async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/cars/:id', async (req: Request, res: Response) => {
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

router.post('/cars', async (req: Request, res: Response) => {
  try {
    const parsed = CarSchema.parse(req.body);
    const newCar = new Car(parsed);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Invalid data', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Server error', error });
    }
  }
});

router.put('/cars/:id', async (req: Request, res: Response) => {
  try {
    const parsed = CarSchema.parse(req.body);
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, parsed, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(updatedCar);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Invalid data', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Server error', error });
    }
  }
});

router.delete('/cars/:id', async (req: Request, res: Response) => {
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

export default router;
