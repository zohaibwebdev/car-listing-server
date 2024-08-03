import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the ICar interface extending from Document
export interface ICar extends Document {
  make: string;
  carModel: string;
  year: number;
}

// Define the Car schema
const CarSchema: Schema<ICar> = new Schema({
  make: { type: String, required: true },
  carModel: { type: String, required: true },
  year: { type: Number, required: true },
});

// Create and export the Car model
const Car: Model<ICar> = mongoose.model<ICar>('Car', CarSchema);
export default Car;
