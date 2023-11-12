import { Router } from "express";
import { createUser, loginUser, getAllUsers, resetPassword, forgetPasswordToken, getUser, deleteUser, updatePassword, handleRefreshedToken, updateUser, blockUser, unBlockUser, logOut } from "../controller/userController";
import { authMiddleware, isAdmin } from '../middleware/authMiddleware'
const router = Router()


router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/forgot-password-token', forgetPasswordToken)
router.post('/reset-password/:token', resetPassword)
router.get('/allusers', getAllUsers)
router.get('/refresh', handleRefreshedToken)
router.get('/logout', logOut)
router.get('/:id', authMiddleware, isAdmin, getUser)
router.delete('/:id', deleteUser)
router.put('/update', authMiddleware, updateUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/un-block-user/:id', authMiddleware, isAdmin, unBlockUser)
router.put('/update-password', authMiddleware, updatePassword)

module.exports = router