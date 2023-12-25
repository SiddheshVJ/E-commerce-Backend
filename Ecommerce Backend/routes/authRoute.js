import { Router } from "express";
import { createUser, getWishlist, loginUser, createOrder, getUserCart, getAllUsers, resetPassword, forgetPasswordToken, getUser, deleteUser, updatePassword, handleRefreshedToken, updateUser, blockUser, unBlockUser, logOut, adminLogin, saveAddress, userCart, emptyCart, applyCoupon } from "../controller/userController";
import { authMiddleware, isAdmin } from '../middleware/authMiddleware'
const router = Router()

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/admin-login', adminLogin)
router.post('/cart/apply-coupon', authMiddleware, applyCoupon)
router.post('/cart/cash-order', authMiddleware, createOrder)
router.post('/cart', authMiddleware, userCart)
router.post('/forgot-password-token', forgetPasswordToken)
router.post('/reset-password/:token', resetPassword)
router.get('/getcart', authMiddleware, getUserCart)
router.get('/allusers', getAllUsers)
router.get('/getwishlist', authMiddleware, getWishlist)
router.get('/refresh', handleRefreshedToken)
router.get('/logout', logOut)
router.get('/:id', authMiddleware, isAdmin, getUser)
router.put('/save-address', authMiddleware, saveAddress)
router.put('/update', authMiddleware, updateUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/un-block-user/:id', authMiddleware, isAdmin, unBlockUser)
router.put('/update-password', authMiddleware, updatePassword)
router.delete('/emptycart', authMiddleware, emptyCart)
router.delete('/:id', deleteUser)

export default router