import { Router } from "express";
import { createBlog, uploadBlogImages, updateBlog, disLikeBlog, likeBlog, deleteBlog, getAllBlogs, getBlog } from "../controller/blogController";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware"
import { blogImgResize, uploadPhoto } from '../middleware/uploadImages'

const router = Router()

router.post('/create-blog', authMiddleware, isAdmin, createBlog)
router.put('/update-blog/:id', authMiddleware, isAdmin, updateBlog)
router.put('/upload-image/:id',
    authMiddleware,
    isAdmin,
    uploadPhoto.array('images', 10),
    blogImgResize,
    uploadBlogImages)
router.get('/get-blog/:id', getBlog)
router.get('/all-blogs', getAllBlogs)
router.delete('/delete-blog/:id', authMiddleware, isAdmin, deleteBlog)
router.put('/likes', authMiddleware, likeBlog)
router.put('/dislikes', authMiddleware, disLikeBlog)



export default router