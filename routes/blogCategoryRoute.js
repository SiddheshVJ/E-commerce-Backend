import { Router } from "express";
import { createBlogCategory, updateBlogCategory, deleteBlogCategory, getBlogCategory, getAllBlogCategory } from "../controller/blogCategoryController";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware"
const router = Router()

router.post('/addblogcategory', authMiddleware, isAdmin, createBlogCategory)
router.put('/updateblogcategory/:id', authMiddleware, isAdmin, updateBlogCategory)
router.delete('/deleteblogcategory/:id', authMiddleware, isAdmin, deleteBlogCategory)
router.get('/getblogcategory/:id', getBlogCategory)
router.get('/getallblogcategory', getAllBlogCategory)

export default router