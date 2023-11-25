import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";


const userSchema = new Schema<TUser>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    hobbies: [{ type: String }],
    address: {
      street: { type: String },
      city: { type: String },
      country: { type: String },
    },
    orders: [
      {
        productName: { type: String },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
  });
  
  
  
  export const User = model<TUser, UserModel>('User', userSchema);