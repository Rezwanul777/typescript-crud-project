import { Model } from 'mongoose';

export interface TUser {
    userId: number;
    username: string;
    password: string;
    fullName: {
      firstName: string;
      lastName: string;
    };
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: {
      street: string;
      city: string;
      country: string;
    };
    isDeleted:boolean;
    orders: Array<{
      productName: string;
      price: number;
      quantity: number;
    }>;
}


export type UserModel = Model<
TUser
//Record<string, never>,

  
>;