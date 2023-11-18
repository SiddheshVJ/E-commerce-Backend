import express from 'express'
import { createProduct, getProduct, addToWishlist, getAllProduct, updateProduct, deleteProduct } from '../controller/productController'
import { isAdmin, authMiddleware } from '../middleware/authMiddleware'
const router = express.Router()

router.post('/', authMiddleware, isAdmin, createProduct)
router.get('/:id', getProduct)
router.post('/:id', authMiddleware, isAdmin, updateProduct)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)
router.get('/', getAllProduct)
router.put('/addtowishlist', authMiddleware, addToWishlist)


export default router