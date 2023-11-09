import { Router } from "express";
import { createUser, loginUser, getAllUsers, getUser, deleteUser, handleRefreshedToken, updateUser, blockUser, unBlockUser, logOut } from "../controller/userController";
import { authMiddleware, isAdmin } from '../middleware/authMiddleware'
const router = Router()


router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/allusers', getAllUsers)
router.get('/refresh', handleRefreshedToken)
router.get('/logout', logOut)
router.get('/:id', authMiddleware, isAdmin, getUser)
router.delete('/:id', deleteUser)
router.put('/update', authMiddleware, updateUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/un-block-user/:id', authMiddleware, isAdmin, unBlockUser)


module.exports = router