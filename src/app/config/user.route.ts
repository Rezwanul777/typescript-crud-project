import express from 'express';
import { userControllers } from './modules/user/user.controller';


const router = express.Router();

// will call controller

router.post('/create-user', userControllers.createUser);
router.get('/', userControllers.getAllUsers);


export const StudentRoutes = router;