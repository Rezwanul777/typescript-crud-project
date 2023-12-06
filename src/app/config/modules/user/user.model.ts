import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import config from '../../../config';
import bcrypt from 'bcrypt'


const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    maxlength: [100, 'Password cannot be more than 100'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      maxlength: [20, 'First name cannot be more than 20'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
      maxlength: [20, 'Last name cannot be more than 20'],
      trim: true,
    },
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
  // isDeleted: {
  //   type: Boolean,
  //   default: false,
  // },
  orders: [
    {
      productName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
},{
  versionKey:false
})

// pre save middleware/hook, will work on create() save

userSchema.pre('save', async function (next) {
  // hashing password saved
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

// post save middleware/hook, 
userSchema.post('save', function (doc,next) {
  doc.password='';
  next()
 });

 // query Middleware
userSchema.pre('find',function(next){
  this.find({isDeleted: {$ne: true}})
  next()
  
})
//prevention  after single  deleting data retriev
userSchema.pre('findOne',function(next){
  this.find({isDeleted: {$ne: true}})
  next()
  
})
export const User = model<TUser, UserModel>('User', userSchema)
