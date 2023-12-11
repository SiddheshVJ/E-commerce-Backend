import { Router } from "express";
import { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory } from '../controller/prodCategoryController'
import { isAdmin, authMiddleware } from '../middleware/authMiddleware'
const router = Router()

router.post('/addcategory', authMiddleware, isAdmin, createCategory)
router.put('/updatecategory/:id', authMiddleware, isAdmin, updateCategory)
router.delete('/deletecategory/:id', authMiddleware, isAdmin, deleteCategory)
router.get('/getcategory/:id', getCategory)
router.get('/getallcategory', getAllCategory)


export default router