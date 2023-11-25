import { Request, Response } from "express";
import { User } from "./user.model";
import { UserService } from "./user.service"



 const createUser = async (req: Request, res: Response) => {
        try {
          const {user:userData }= req.body;
          // Save the new user to the database
          const savedUser = await UserService.createUserDB(userData)
      
          // Respond with the saved user object (excluding sensitive fields like password)
          const { password, ...userWithoutPassword } = savedUser.toObject();
          res.status(201).json({
            success: true,
            message: 'User created successfully!',
            data: userWithoutPassword,
          });
        } catch (error:any) {
          res.status(500).json({ success: false, message: 'Failed to create user', error: error.message });
        }
      
      
}

const getAllUsers=async(req:Request,res:Response)=>{
    try {
        const result=await UserService.getAllUsersFromDB()
        res.status(200).json({
            success: true,
            message: 'Users got successfully!',
            data: result,
          });
    } catch (error) {
        console.log(error);
        
    }
}

const singleStudent=async(req: Request, res: Response)=>{
  try {
    
  } catch (error) {
    console.log(error);
  }
}



export const userControllers={
    createUser,
    getAllUsers,
    singleStudent
}