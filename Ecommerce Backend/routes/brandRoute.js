import { Router } from "express";
import { createBrand, updateBrand, deleteBrand, getBrand, getAllBrand } from "../controller/brandController";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware"
const router = Router()

router.post('/addbrand', authMiddleware, isAdmin, createBrand)
router.put('/renamebrand/:id', authMiddleware, isAdmin, updateBrand)
router.delete('/deletebrand/:id', authMiddleware, isAdmin, deleteBrand)
router.get('/getbrand/:id', getBrand)
router.get('/getallbrands', getAllBrand)

export default router