import { Request, Response } from "express";
import { User } from "./user.model";
import { UserService, isUserExists } from "./user.service"



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

 const singleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserService.singleUserFromDB(userId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    }

    const RequiredResult = {
      userId: result.userId,
      username: result.username,
      fullName: result.fullName,
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: result.address,
    };

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: RequiredResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
     
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const userData = req.body;

    // Check if the user exists
    const userExists = await isUserExists(userId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    }

    // Update user data
    const updatedUser = await UserService.updateUserFromDB(userId, userData);

    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update user',
        error: {
          code: 404,
          description: 'Failed to update user',
        },
      });
    }

    // Format response
    const updatedResult = {
      userId: updatedUser.userId,
      username: updatedUser.username,
      fullName: updatedUser.fullName,
      age: updatedUser.age,
      email: updatedUser.email,
      isActive: updatedUser.isActive,
      hobbies: updatedUser.hobbies,
      address: updatedUser.address,
    };

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: {
        code: 500,
        description: 'Internal server error',
      },
    });
  }
};



export const userControllers={
    createUser,
    getAllUsers,
    singleUser,
    updateUser
}