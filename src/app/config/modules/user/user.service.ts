import { TUser } from "./user.interface";
import { User } from "./user.model";


const createUserDB=async (user:TUser) => {
    const result = await User.create(user);
    return result
}

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

const singleUserFromDB=async (id:string) => {
    const result = await User.findOne({id:id});
    return result;
}

export const UserService = {
    createUserDB,
    getAllUsersFromDB,
    singleUserFromDB
}