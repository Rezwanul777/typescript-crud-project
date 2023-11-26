import express from 'express'
import { addProductToUserOrder, userControllers } from './user.controller'

const router = express.Router()

// will call controller

router.post('/create-user', userControllers.createUser)
router.get('/', userControllers.getAllUsers)
router.get('/:userId', userControllers.singleUser)
router.put('/:userId', userControllers.updateUser)
router.delete('/:userId', userControllers.deleteUser);

// PUT /api/users/:userId/orders
router.put('/:userId/orders',addProductToUserOrder);

export const StudentRoutes = router
