import { Router } from "express";
import { createBlog, updateBlog, disLikeBlog, likeBlog, deleteBlog, getAllBlogs, getBlog } from "../controller/blogController";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware"
const router = Router()

router.post('/create-blog', authMiddleware, isAdmin, createBlog)
router.put('/update-blog/:id', authMiddleware, isAdmin, updateBlog)
router.get('/get-blog/:id', getBlog)
router.get('/all-blogs', getAllBlogs)
router.delete('/delete-blogs/:id', authMiddleware, isAdmin, deleteBlog)
router.put('/likes', authMiddleware, likeBlog)
router.put('/dislikes', authMiddleware, disLikeBlog)



export default router