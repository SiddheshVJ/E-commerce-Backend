import { Router } from "express";
import { createCoupon, getAllCoupon, deleteCoupon, updateCoupon } from '../controller/couponController'
import { authMiddleware, isAdmin } from "../middleware/authMiddleware"
const router = Router()

router.post('/createcoupon', authMiddleware, isAdmin, createCoupon)
router.get('/getallcoupon', authMiddleware, isAdmin, getAllCoupon)
router.put('/updatecoupon/:id', authMiddleware, isAdmin, updateCoupon)
router.delete('/deletecoupon/:id', authMiddleware, isAdmin, deleteCoupon)


export default router
