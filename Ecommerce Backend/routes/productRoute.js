import express from 'express'
import { createProduct, getProduct, uploadImages, rating, addToWishlist, getAllProduct, updateProduct, deleteProduct } from '../controller/productController'
import { isAdmin, authMiddleware } from '../middleware/authMiddleware'
import { productImgResize, uploadPhoto } from '../middleware/uploadImages'
const router = express.Router()

router.post('/', authMiddleware, isAdmin, createProduct)
router.put('/upload-images/:id',
    authMiddleware,
    isAdmin,
    uploadPhoto.array('images', 10),
    productImgResize,
    uploadImages
)
router.get('/:id', getProduct)
router.post('/update-product/:id', authMiddleware, isAdmin, updateProduct)
router.delete('/delete-product/:id', authMiddleware, isAdmin, deleteProduct)
router.get('/', getAllProduct)
router.put('/addtowishlist', authMiddleware, addToWishlist)
router.put('/rating', authMiddleware, rating)


export default router