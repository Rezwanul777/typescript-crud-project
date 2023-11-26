import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";


const userSchema = new Schema<TUser>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, maxlength:[20,'Password cannot be more than 20'] },
    fullName: {
      firstName: { type: String, required:[true, 'First Name is required'],  maxlength: [20, 'First name cannot be more than 20'],
      trim: true },
      lastName: { type: String, required:[true, 'Last Name is required'],  maxlength: [20, 'Last name cannot be more than 20'],
      trim: true  },
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
    isDeleted:{
      type: Boolean,
      default: false,
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