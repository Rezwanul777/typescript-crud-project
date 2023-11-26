import { z } from 'zod';

const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const OrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().max(20),
  fullName: z.object({
    firstName: z.string().max(20),
    lastName: z.string().max(20),
  }),
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressSchema,
  isDeleted: z.boolean().optional(),
  orders: z.array(OrderSchema),
});
