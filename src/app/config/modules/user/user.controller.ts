import { Request, Response } from 'express'

import { UserService, calculateTotalPrice, getUserOrders, isUserExists } from './user.service'
import { UserValidationSchema } from './user.validation'
import { addProductToOrder } from './user.service'
import { TUser } from './user.interface'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    // data validation using Zod
    // const zodParseData= await UserValidationSchema.parse(userData)

    // const savedUser = await UserService.createUserDB(zodParseData)

    const result = await UserService.createUserDB(UserValidationSchema.parse(userData) as TUser);

    // Respond  excluding sensitive fields like password and other fields in response body
    // const { isDeleted, _id,orders,...userWithoutSensitiveFields } = result.toObject({ getters: true });

    const responseData = {
      userId: result.userId,
      username: result.username,
      fullName: {
        firstName: result.fullName.firstName,
        lastName: result.fullName.lastName,
      },
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: result.address,
    };

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data:responseData,
    })
  } catch (error: any) {
    res
      .status(500)
      .json({
        success: false,
        message: 'Failed to create user',
        error: error.message ||"Something went wrong creating user",
      })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsersFromDB()
    res.status(200).json({
      success: true,
      message: 'Users got successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const singleUser = async (req:Request,res:Response) => {
  try {
    const userId = Number(req.params.userId)
    const result = await UserService.singleUserFromDB(userId)
 

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
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
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: RequiredResult,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    const userData = req.body

    // Check if the user exists
    const userExists = await isUserExists(userId)
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    }

    // Update user data
    const updatedUser = await UserService.updateUserFromDB(userId, userData)

    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
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
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedResult,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

// delete controller

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    const result:any = await UserService.deleteUserfromDB(userId)
    if (result.n === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

//oreder controller

export const addProductToUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productName, price, quantity } = req.body;

    const success = await addProductToOrder(Number(userId), { productName, price, quantity });

    if (success) {
      res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      throw new Error('Failed to create order');
    }
  } catch (error: any) {
    
    res.status(500).json({
  
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};


// get order for single user

export const getUserOrdersController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await getUserOrders(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: { orders },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// calculation controller

export const calculateTotalPriceController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const totalPrice = await calculateTotalPrice(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};


export const userControllers = {
  createUser,
  getAllUsers,
  singleUser,
  updateUser,
  deleteUser,
}


// const result = await UserServices.createUserIntoDB(userSchema.parse(userData)