import express from 'express'
import { userControllers } from './user.controller'

const router = express.Router()

// will call controller

router.post('/create-user', userControllers.createUser)
router.get('/', userControllers.getAllUsers)
router.get('/:userId', userControllers.singleUser)
router.put('/:userId', userControllers.updateUser)

export const StudentRoutes = router
