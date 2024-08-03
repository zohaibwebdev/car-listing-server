import  { Document, Schema, model } from 'mongoose';
import { z } from 'zod';

export const CarSchema = z.object({
  make: z.string().min(1, { message: 'Make is required' }),
  carModel: z.string().min(1, { message: 'Car model is required' }),
  year: z.number().int().positive().max(new Date().getFullYear(), { message: 'Year must be a valid year' }),
});

export type CarType = z.infer<typeof CarSchema>;

const carMongooseSchema = new Schema<CarType & Document>({
  make: { type: String, required: true },
  carModel: { type: String, required: true },
  year: { type: Number, required: true },
});

const Car = model<CarType & Document>('Car', carMongooseSchema);
export default Car;
