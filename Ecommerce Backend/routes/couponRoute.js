import { Router } from "express";
import { createCoupon, getAllCoupon, deleteCoupon, updateCoupon } from '../controller/couponController'
import { authMiddleware, isAdmin } from "../middleware/authMiddleware"
const router = Router()

router.get('/getallcoupon', authMiddleware, getAllCoupon)
router.post('/createcoupon', authMiddleware, isAdmin, createCoupon)
router.put('/updatecoupon/:id', authMiddleware, isAdmin, updateCoupon)
router.delete('/deletecoupon/:id', authMiddleware, isAdmin, deleteCoupon)


export default router
