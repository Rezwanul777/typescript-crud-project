import { TUser } from "./user.interface";
import { User } from "./user.model";

// create user
const createUserDB=async (user:TUser) => {
    const result = await User.create(user)
    return result
}

// get all users
 const getAllUsersFromDB = async () => {
    try {
      const users = await User.find().lean().exec(); //to retrieve plain JavaScript objects instead of Mongoose documents and The exec() method executes the query.
  
      return users.map((user: Partial<TUser>) => ({
        username: user.username,
        fullName: user.fullName,
        age: user.age,
        email: user.email,
        address: user.address,
      }));
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  };

  // single user

const singleUserFromDB=async (id:number) => {
    const result = await User.findOne({userId: id});
    return result;
}

// update
 const updateUserFromDB = async (id: number,userData:TUser)  => {
  try {
    
    const updatedUser = await User.findOneAndUpdate({ userId:id }, userData, { new: true }).select('-password').lean().exec();
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

export const isUserExists = async (id: number): Promise<boolean> => {
  try {
    const user = await User.findOne({ userId:id }).lean().exec();
    return !!user;
  } catch (error) {
    throw new Error('Error in user existence');
  }
};

// delete
const deleteUserfromDB = async (id: number):Promise<any>  => {
  const result = await User.updateOne({userId:id });
  return result;
};

// order Management:create order
export const addProductToOrder = async (userId: number, productData: { productName: string; price: number; quantity: number }) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.orders) {
      user.orders = [];
    }

    user.orders.push(productData);
    await user.save();

    return true; 
  } catch (error) {
    
    throw new Error('Failed to create order');
  }
};


// get order for single user

export const getUserOrders = async (userId: number) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found');
    }

    const orders = user.orders || [];

    return orders;
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
};

// calculation of total orders for single user
export const calculateTotalPrice = async (userId: number) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error('User not found');
    }

    const orders = user.orders || [];
    const totalPrice = orders.reduce((acc, order) => acc + (order.price * order.quantity), 0);

    return totalPrice;
  } catch (error) {
    throw new Error('Failed to calculate total price');
  }
};






export const UserService = {
    createUserDB,
    getAllUsersFromDB,
    singleUserFromDB,
    updateUserFromDB,
    deleteUserfromDB,
   
}


// const createUserIntoDB = async (userData: TUser) => {
//   if (await User.isUserExists(userData.userId)) {
//     throw new Error('User already exists');
//   }
//   const result = await User.create(userData);
//   return result;
// };