import express from 'express'
import { addProductToUserOrder, calculateTotalPriceController, getUserOrdersController, userControllers } from './user.controller'

const router = express.Router()

// will call controller

router.post('/', userControllers.createUser)
router.get('/', userControllers.getAllUsers)
router.get('/:userId', userControllers.singleUser)
router.put('/:userId', userControllers.updateUser)
router.delete('/:userId', userControllers.deleteUser);

// PUT /api/users/:userId/orders
router.put('/:userId/orders',addProductToUserOrder);
// get orders for single user
router.get('/:userId/orders', getUserOrdersController);

// calculation
router.get('/:userId/orders/total-price', calculateTotalPriceController);

export const StudentRoutes = router
